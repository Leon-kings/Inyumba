// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

// // Material-UI Icons
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
// import BedIcon from "@mui/icons-material/Bed";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import SchoolIcon from "@mui/icons-material/School";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import BathroomIcon from "@mui/icons-material/Bathroom";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import WifiIcon from "@mui/icons-material/Wifi";
// import LocalParkingIcon from "@mui/icons-material/LocalParking";
// import SecurityIcon from "@mui/icons-material/Security";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import InfoIcon from "@mui/icons-material/Info";
// import HotelIcon from "@mui/icons-material/Hotel";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import ClearIcon from "@mui/icons-material/Clear";
// import LoginIcon from "@mui/icons-material/Login";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import SaveIcon from "@mui/icons-material/Save";

// // ============================================================
// // 1. DATA FROM THE PROVIDED DOCUMENTS
// // ============================================================

// interface StudentHouse {
//   id: number;
//   name: string;
//   type: string;
//   price: number;
//   priceRWF: number;
//   nights: number;
//   rating: number;
//   category: string;
//   university: string;
//   province: string;
//   district: string;
//   sector: string;
//   cell: string;
//   village: string;
//   code_vil_1?: string;
//   rooms: number;
//   bathrooms: number;
//   image: string;
//   description: string;
//   amenities: string[];
//   owner: string;
//   contact: string;
//   bookingStatus: "available" | "booked" | "pending";
//   minutesFromCampus: number;
//   features: string[];
//   yearBuilt: number;
// }

// const studentHousesData: StudentHouse[] = [
//   // ===================== KIGALI CITY - Nyarugenge =====================
//   {
//     id: 1,
//     name: "Gihanga Student Lodge",
//     type: "House",
//     price: 85,
//     priceRWF: 110500,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Gitega",
//     cell: "Akabahizi",
//     village: "Gihanga",
//     code_vil_1: "11010104",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description:
//       "Modern student house in Gihanga, near UR-CST campus. Fully furnished with study area.",
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Security",
//       "Parking",
//       "Study Room",
//       "Laundry",
//     ],
//     owner: "Ntwari Jean Rene",
//     contact: "+250 780414088",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Solar Panels", "Water Heater", "Study Desk"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 2,
//     name: "Iterambere Student Apartments",
//     type: "Apartment",
//     price: 70,
//     priceRWF: 91000,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Gitega",
//     cell: "Akabahizi",
//     village: "Iterambere",
//     code_vil_1: "11010105",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Spacious apartments near UR-CST, perfect for students.",
//     amenities: ["WiFi", "Kitchen", "Security", "Water Heater"],
//     owner: "Mukamana Alice",
//     contact: "+250 788123456",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Water Heater", "Balcony"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 3,
//     name: "Izuba Student House",
//     type: "House",
//     price: 95,
//     priceRWF: 123500,
//     nights: 30,
//     rating: 4.9,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Gitega",
//     cell: "Akabahizi",
//     village: "Izuba",
//     code_vil_1: "11010106",
//     rooms: 5,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Large student house with garden, near UR-CST.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area", "BBQ"],
//     owner: "Habimana Jean",
//     contact: "+250 788654321",
//     bookingStatus: "available",
//     minutesFromCampus: 10,
//     features: ["Garden", "BBQ Area"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 4,
//     name: "Akinyambo Student Hostel",
//     type: "Room",
//     price: 50,
//     priceRWF: 65000,
//     nights: 30,
//     rating: 4.5,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Gitega",
//     cell: "Akabeza",
//     village: "Akinyambo",
//     code_vil_1: "11010202",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable single rooms for students near UR-CST.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//     owner: "Uwimana Marie",
//     contact: "+250 788987654",
//     bookingStatus: "available",
//     minutesFromCampus: 7,
//     features: ["Common Lounge"],
//     yearBuilt: 2019,
//   },
//   {
//     id: 5,
//     name: "Amayaga Student Apartments",
//     type: "Apartment",
//     price: 75,
//     priceRWF: 97500,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Gitega",
//     cell: "Akabeza",
//     village: "Amayaga",
//     code_vil_1: "11010203",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Modern student apartments in Amayaga, close to UR-CST.",
//     amenities: ["WiFi", "Kitchenette", "Security", "Study Desk", "Laundry"],
//     owner: "Niyonkuru David",
//     contact: "+250 788456789",
//     bookingStatus: "available",
//     minutesFromCampus: 6,
//     features: ["Study Desk", "Laundry"],
//     yearBuilt: 2023,
//   },
//   {
//     id: 6,
//     name: "Kiyovu Student Flats",
//     type: "Apartment",
//     price: 90,
//     priceRWF: 117000,
//     nights: 30,
//     rating: 4.9,
//     category: "student",
//     university: "UR - CST (Science & Tech)",
//     province: "Kigali City",
//     district: "Nyarugenge",
//     sector: "Nyarugenge",
//     cell: "Kiyovu",
//     village: "Amizero",
//     code_vil_1: "11090301",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description:
//       "Premium student apartments in Kiyovu, walking distance to UR-CST.",
//     amenities: ["WiFi", "Kitchen", "Security", "Elevator", "Study Area"],
//     owner: "Rukundo Jean",
//     contact: "+250 788444666",
//     bookingStatus: "available",
//     minutesFromCampus: 3,
//     features: ["Elevator", "Study Area"],
//     yearBuilt: 2023,
//   },
//   {
//     id: 7,
//     name: "Kamatamu Student Village",
//     type: "Apartment",
//     price: 80,
//     priceRWF: 104000,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "University of Kigali (UoK)",
//     province: "Kigali City",
//     district: "Gasabo",
//     sector: "Kacyiru",
//     cell: "Kamatamu",
//     village: "Amajyambere",
//     code_vil_1: "12070101",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student apartments near University of Kigali in Kamatamu.",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
//     owner: "Kagabo Eric",
//     contact: "+250 788111222",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Room", "Garden"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 8,
//     name: "Ruhango Student Lodge",
//     type: "House",
//     price: 85,
//     priceRWF: 110500,
//     nights: 30,
//     rating: 4.6,
//     category: "student",
//     university: "Kigali Independent Univ. (ULK)",
//     province: "Kigali City",
//     district: "Gasabo",
//     sector: "Gisozi",
//     cell: "Ruhango",
//     village: "Kanyinya",
//     code_vil_1: "12040201",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Spacious student house near ULK in Gisozi.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area"],
//     owner: "Muhire Jean",
//     contact: "+250 788333444",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Garden", "Study Room"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 9,
//     name: "Masoro Student Hostel",
//     type: "Room",
//     price: 55,
//     priceRWF: 71500,
//     nights: 30,
//     rating: 4.4,
//     category: "student",
//     university: "Adventist Univ. (AUCA)",
//     province: "Kigali City",
//     district: "Gasabo",
//     sector: "Masoro",
//     cell: "Kivugiza",
//     village: "Gasenga",
//     code_vil_1: "12090301",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near AUCA in Masoro.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//     owner: "Dusabimana Grace",
//     contact: "+250 788555666",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Common Area"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 10,
//     name: "Ndera Student Village",
//     type: "Apartment",
//     price: 95,
//     priceRWF: 123500,
//     nights: 30,
//     rating: 4.9,
//     category: "student",
//     university: "Carnegie Mellon (CMU-Africa)",
//     province: "Kigali City",
//     district: "Gasabo",
//     sector: "Ndera",
//     cell: "Bwiza",
//     village: "Akarwasa",
//     code_vil_1: "12110101",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Premium student apartments near CMU-Africa in Ndera.",
//     amenities: ["WiFi", "Kitchen", "Security", "Elevator", "Study Area"],
//     owner: "Niyomugabo Eric",
//     contact: "+250 788222666",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Elevator", "Study Area"],
//     yearBuilt: 2023,
//   },
//   {
//     id: 11,
//     name: "Mburabuturo Student House",
//     type: "House",
//     price: 88,
//     priceRWF: 114400,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "UR - CBE (Business & Econ)",
//     province: "Kigali City",
//     district: "Kicukiro",
//     sector: "Gikondo",
//     cell: "Mburabuturo",
//     village: "Rebero",
//     code_vil_1: "13030106",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Spacious student house near UR-CBE in Gikondo.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//     owner: "Niyomugabo Eric",
//     contact: "+250 788555777",
//     bookingStatus: "available",
//     minutesFromCampus: 7,
//     features: ["Garden", "Study Room"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 12,
//     name: "Niboye Student Hostel",
//     type: "Room",
//     price: 48,
//     priceRWF: 62400,
//     nights: 30,
//     rating: 4.5,
//     category: "student",
//     university: "IPRC Kigali",
//     province: "Kigali City",
//     district: "Kicukiro",
//     sector: "Niboye",
//     cell: "Niboye",
//     village: "Buhoro",
//     code_vil_1: "13090201",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable rooms for IPRC Kigali students.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//     owner: "Rwabugiri John",
//     contact: "+250 788111333",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Area"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 13,
//     name: "Ruhande Student Flats",
//     type: "Apartment",
//     price: 72,
//     priceRWF: 93600,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "UR - Huye Campus",
//     province: "Southern",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Butare",
//     village: "Ruhande",
//     code_vil_1: "24090101",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student apartments near UR Huye campus in Ruhande.",
//     amenities: ["WiFi", "Kitchenette", "Security", "Study Area"],
//     owner: "Niyigena Jean",
//     contact: "+250 788777888",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Area"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 14,
//     name: "Butare Student Lodge",
//     type: "House",
//     price: 88,
//     priceRWF: 114400,
//     nights: 30,
//     rating: 4.6,
//     category: "student",
//     university: "UR - Huye Campus",
//     province: "Southern",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Butare",
//     village: "Butare",
//     code_vil_1: "24090102",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house in Butare, walking distance to UR Huye campus.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//     owner: "Mukeshimana Anna",
//     contact: "+250 788999000",
//     bookingStatus: "available",
//     minutesFromCampus: 10,
//     features: ["Garden", "Study Room"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 15,
//     name: "IPRC Huye Hostel",
//     type: "Room",
//     price: 45,
//     priceRWF: 58500,
//     nights: 30,
//     rating: 4.3,
//     category: "student",
//     university: "IPRC Huye",
//     province: "Southern",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Ngoma",
//     village: "Ngoma I",
//     code_vil_1: "24090402",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable rooms for IPRC Huye students.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//     owner: "Rwabugiri John",
//     contact: "+250 788999111",
//     bookingStatus: "available",
//     minutesFromCampus: 7,
//     features: ["Study Area"],
//     yearBuilt: 2019,
//   },
//   {
//     id: 16,
//     name: "Kabgayi Student Hostel",
//     type: "Room",
//     price: 42,
//     priceRWF: 54600,
//     nights: 30,
//     rating: 4.4,
//     category: "student",
//     university: "Catholic Institute (ICK)",
//     province: "Southern",
//     district: "Muhanga",
//     sector: "Cyiza",
//     cell: "Kabgayi",
//     village: "Kabgayi",
//     code_vil_1: "27020201",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near ICK in Kabgayi.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//     owner: "Uwimana Jean",
//     contact: "+250 788999111",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Study Area"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 17,
//     name: "Gitwe Student House",
//     type: "House",
//     price: 70,
//     priceRWF: 91000,
//     nights: 30,
//     rating: 4.5,
//     category: "student",
//     university: "University of Gitwe",
//     province: "Southern",
//     district: "Ruhango",
//     sector: "Ruhango",
//     cell: "Ruhango",
//     village: "Ruhango",
//     code_vil_1: "26090101",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near University of Gitwe.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
//     owner: "Niyomugabo Jean",
//     contact: "+250 788111444",
//     bookingStatus: "available",
//     minutesFromCampus: 10,
//     features: ["Garden"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 18,
//     name: "INES Ruhengeri Student Lodge",
//     type: "House",
//     price: 85,
//     priceRWF: 110500,
//     nights: 30,
//     rating: 4.9,
//     category: "student",
//     university: "INES-Ruhengeri",
//     province: "Northern",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Cyabararika",
//     village: "Cyabararika",
//     code_vil_1: "43080101",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description:
//       "Modern student house near INES-Ruhengeri, 5 min walk to campus.",
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Security",
//       "Parking",
//       "Study Room",
//       "Laundry",
//     ],
//     owner: "Ntwari Jean Rene",
//     contact: "+250 780414088",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Solar Panels", "Water Heater", "Study Desk"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 19,
//     name: "Kigombe Student Apartments",
//     type: "Apartment",
//     price: 70,
//     priceRWF: 91000,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "INES-Ruhengeri",
//     province: "Northern",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Kigombe",
//     village: "Kigombe",
//     code_vil_1: "43080201",
//     rooms: 3,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Spacious apartments for students, close to INES-Ruhengeri.",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Water Heater"],
//     owner: "Mukamana Alice",
//     contact: "+250 788123456",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Water Heater", "Balcony"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 20,
//     name: "Ruhengeri City Hostel",
//     type: "Room",
//     price: 50,
//     priceRWF: 65000,
//     nights: 30,
//     rating: 4.6,
//     category: "student",
//     university: "INES-Ruhengeri",
//     province: "Northern",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Ruhengeri",
//     village: "Ruhengeri",
//     code_vil_1: "43080401",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable single rooms for students in central Ruhengeri.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//     owner: "Uwimana Marie",
//     contact: "+250 788987654",
//     bookingStatus: "available",
//     minutesFromCampus: 15,
//     features: ["Common Lounge"],
//     yearBuilt: 2019,
//   },
//   {
//     id: 21,
//     name: "Busogo Student Village",
//     type: "Apartment",
//     price: 80,
//     priceRWF: 104000,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "UR - CAVM (Agriculture)",
//     province: "Northern",
//     district: "Musanze",
//     sector: "Busogo",
//     cell: "Busogo",
//     village: "Busogo",
//     code_vil_1: "43010101",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student apartments near UR-CAVM campus in Busogo.",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
//     owner: "Kagabo Eric",
//     contact: "+250 788111222",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Room"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 22,
//     name: "IPRC Musanze Hostel",
//     type: "Room",
//     price: 55,
//     priceRWF: 71500,
//     nights: 30,
//     rating: 4.4,
//     category: "student",
//     university: "IPRC Musanze",
//     province: "Northern",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Mpenge",
//     village: "Mpenge",
//     code_vil_1: "43080301",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near IPRC Musanze campus.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//     owner: "Dusabimana Grace",
//     contact: "+250 788555666",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Common Area"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 23,
//     name: "Butaro Student Village",
//     type: "Apartment",
//     price: 82,
//     priceRWF: 106600,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "Univ. of Global Health Equity",
//     province: "Northern",
//     district: "Burera",
//     sector: "Butaro",
//     cell: "Butaro",
//     village: "Butaro",
//     code_vil_1: "44020502",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student apartments near University of Global Health Equity.",
//     amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Laundry"],
//     owner: "Rukundo Paul",
//     contact: "+250 788222555",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Room", "Laundry"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 24,
//     name: "Rukara Student Village",
//     type: "Apartment",
//     price: 68,
//     priceRWF: 88400,
//     nights: 30,
//     rating: 4.6,
//     category: "student",
//     university: "UR - CE (Education)",
//     province: "Eastern",
//     district: "Rwamagana",
//     sector: "Rukara",
//     cell: "Rukara",
//     village: "Rukara",
//     code_vil_1: "54100201",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student housing near UR-CE campus in Rwamagana.",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking"],
//     owner: "Uwimana Jean",
//     contact: "+250 788222444",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Parking"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 25,
//     name: "Nyagatare Student Lodge",
//     type: "House",
//     price: 65,
//     priceRWF: 84500,
//     nights: 30,
//     rating: 4.5,
//     category: "student",
//     university: "UR - Nyagatare Campus",
//     province: "Eastern",
//     district: "Nyagatare",
//     sector: "Nyagatare",
//     cell: "Nyagatare",
//     village: "Nyagatare I",
//     code_vil_1: "52100703",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near UR Nyagatare campus.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
//     owner: "Muhirwa Albert",
//     contact: "+250 788333555",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Garden"],
//     yearBuilt: 2021,
//   },
//   {
//     id: 26,
//     name: "Gashora Student Lodge",
//     type: "Room",
//     price: 55,
//     priceRWF: 71500,
//     nights: 30,
//     rating: 4.5,
//     category: "student",
//     university: "RICA (Conservation Agric.)",
//     province: "Eastern",
//     district: "Bugesera",
//     sector: "Gashora",
//     cell: "Gashora",
//     village: "Gashora",
//     code_vil_1: "57010101",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Student rooms near RICA in Gashora.",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//     owner: "Mukamana Alice",
//     contact: "+250 788999222",
//     bookingStatus: "available",
//     minutesFromCampus: 5,
//     features: ["Study Area"],
//     yearBuilt: 2022,
//   },
//   {
//     id: 27,
//     name: "Karongi Student Hostel",
//     type: "Room",
//     price: 50,
//     priceRWF: 65000,
//     nights: 30,
//     rating: 4.4,
//     category: "student",
//     university: "IPRC Karongi",
//     province: "Western",
//     district: "Karongi",
//     sector: "Bwishyura",
//     cell: "Bwishyura",
//     village: "Bwishyura",
//     code_vil_1: "31010703",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near IPRC Karongi.",
//     amenities: ["WiFi", "Shared Kitchen", "Security"],
//     owner: "Uwimana Marie",
//     contact: "+250 788666999",
//     bookingStatus: "available",
//     minutesFromCampus: 6,
//     features: ["Shared Kitchen"],
//     yearBuilt: 2020,
//   },
//   {
//     id: 28,
//     name: "Gisenyi Student House",
//     type: "House",
//     price: 75,
//     priceRWF: 97500,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "UTB (Tourism & Business)",
//     province: "Western",
//     district: "Rubavu",
//     sector: "Gisenyi",
//     cell: "Gisenyi",
//     village: "Gisenyi",
//     code_vil_1: "33040201",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near UTB in Gisenyi, close to Lake Kivu.",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//     owner: "Habimana Jean",
//     contact: "+250 788555888",
//     bookingStatus: "available",
//     minutesFromCampus: 8,
//     features: ["Garden", "Lake View"],
//     yearBuilt: 2021,
//   },
// ];

// // ============================================================
// // 2. TYPES & TRANSLATIONS
// // ============================================================

// interface HeroProps {
//   onSearch?: (params: any) => void;
// }

// // Helper function to get language from cookies
// const getLanguageFromCookies: () => "en" | "fr" | "rw" = () => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

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
//       owner: "Owner",
//       contact: "Contact",
//       bookingStatus: "Status",
//       statusAvailable: "Available",
//       statusBooked: "Booked",
//       statusPending: "Pending",
//       province: "Province",
//       minutesFromCampus: "Minutes from Campus",
//       features: "Features",
//       yearBuilt: "Year Built",
//       priceRWF: "Price in RWF",
//       advancedSearch: "Advanced Search",
//       filters: "Filters",
//       searchBy: "Search by",
//       campus: "Campus",
//       districtLabel: "District",
//       cellLabel: "Cell",
//       villageLabel: "Village",
//       minFromCampus: "Minutes from Campus",
//       loginRequired: "Login Required",
//       loginToOrder: "Please login to order this house",
//       orderNow: "Order Now",
//       loginNow: "Login",
//       registerNow: "Register",
//       or: "or",
//       houseDetails: "House Details",
//       orderHouse: "Order This House",
//       priceInRWF: "Price in RWF",
//       code: "Village Code",
//       aboutProject: "About Inyumba Project",
//       ourMission: "Our Mission",
//       ourVision: "Our Vision",
//       ourExpectations: "Our Expectations",
//       whatWeProvide: "What We Provide",
//       yearsOfExperience: "Years of Experience",
//       happyStudents: "Happy Students",
//       partnerUniversities: "Partner Universities",
//       propertiesAvailable: "Properties Available",
//       learnMore: "Learn More About Inyumba Project",
//       ourStory: "Our Story",
//       whyChooseUs: "Why Choose Us",
//       ourValues: "Our Values",
//       testimonials: "What Our Students Say",
//       viewAllProperties: "View All Properties",
//       filterBy: "Filter by",
//       priceRange: "Price Range",
//       minPrice: "Min Price",
//       maxPrice: "Max Price",
//       applyFilters: "Apply Filters",
//       resetFilters: "Reset Filters",
//       sortBy: "Sort by",
//       priceLowHigh: "Price: Low to High",
//       priceHighLow: "Price: High to Low",
//       ratingHighLow: "Rating: High to Low",
//       nearestFirst: "Nearest First",
//       email: "Email",
//       password: "Password",
//       confirmPassword: "Confirm Password",
//       phone: "Phone",
//       showLess: "Show Less",
//       save: "Save",
//       saving: "Saving...",
//       saveSuccess: "Saved successfully!",
//       saveFailed: "Failed to save. Please try again.",
//     },
//     fr: {
//       popularHomes: "Maisons étudiantes disponibles",
//       room: "Chambre",
//       apartment: "Appartement",
//       nights: "mois",
//       where: "Emplacement",
//       searchDestinations: "Rechercher des universités ou lieux au Rwanda",
//       when: "Date d'emménagement",
//       addDates: "Sélectionner la date d'emménagement",
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
//       owner: "Propriétaire",
//       contact: "Contact",
//       bookingStatus: "Statut",
//       statusAvailable: "Disponible",
//       statusBooked: "Réservé",
//       statusPending: "En attente",
//       province: "Province",
//       minutesFromCampus: "Minutes du campus",
//       features: "Caractéristiques",
//       yearBuilt: "Année de construction",
//       priceRWF: "Prix en RWF",
//       advancedSearch: "Recherche avancée",
//       filters: "Filtres",
//       searchBy: "Rechercher par",
//       campus: "Campus",
//       districtLabel: "District",
//       cellLabel: "Cellule",
//       villageLabel: "Village",
//       minFromCampus: "Minutes du campus",
//       loginRequired: "Connexion requise",
//       loginToOrder: "Veuillez vous connecter pour commander cette maison",
//       orderNow: "Commander maintenant",
//       loginNow: "Se connecter",
//       registerNow: "S'inscrire",
//       or: "ou",
//       houseDetails: "Détails de la maison",
//       orderHouse: "Commander cette maison",
//       priceInRWF: "Prix en RWF",
//       code: "Code du village",
//       aboutProject: "À propos du projet Inyumba",
//       ourMission: "Notre mission",
//       ourVision: "Notre vision",
//       ourExpectations: "Nos attentes",
//       whatWeProvide: "Ce que nous offrons",
//       yearsOfExperience: "Années d'expérience",
//       happyStudents: "Étudiants satisfaits",
//       partnerUniversities: "Universités partenaires",
//       propertiesAvailable: "Propriétés disponibles",
//       learnMore: "En savoir plus sur le projet Inyumba",
//       ourStory: "Notre histoire",
//       whyChooseUs: "Pourquoi nous choisir",
//       ourValues: "Nos valeurs",
//       testimonials: "Ce que disent nos étudiants",
//       viewAllProperties: "Voir toutes les propriétés",
//       filterBy: "Filtrer par",
//       priceRange: "Gamme de prix",
//       minPrice: "Prix minimum",
//       maxPrice: "Prix maximum",
//       applyFilters: "Appliquer les filtres",
//       resetFilters: "Réinitialiser les filtres",
//       sortBy: "Trier par",
//       priceLowHigh: "Prix: Croissant",
//       priceHighLow: "Prix: Décroissant",
//       ratingHighLow: "Note: Décroissante",
//       nearestFirst: "Plus proche d'abord",
//       email: "E-mail",
//       password: "Mot de passe",
//       confirmPassword: "Confirmer le mot de passe",
//       phone: "Téléphone",
//       showLess: "Afficher moins",
//       save: "Enregistrer",
//       saving: "Enregistrement...",
//       saveSuccess: "Enregistré avec succès !",
//       saveFailed: "Échec de l'enregistrement. Veuillez réessayer.",
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
//       owner: "Nyiri nzu",
//       contact: "Numero",
//       bookingStatus: "Ihagaze",
//       statusAvailable: "Irahari",
//       statusBooked: "Yakozweho icyemezo",
//       statusPending: "Irateganijwe",
//       province: "Intara",
//       minutesFromCampus: "Iminota uva kuri kaminuza",
//       features: "Ibiranga",
//       yearBuilt: "Umwaka wubatswe",
//       priceRWF: "Igiciro mu Rwanda",
//       advancedSearch: "Ubushakashatsi buhanitse",
//       filters: "Imyunyu",
//       searchBy: "Shakisha ukurikije",
//       campus: "Kaminuza",
//       districtLabel: "Akarere",
//       cellLabel: "Akagari",
//       villageLabel: "Umudugudu",
//       minFromCampus: "Iminota uva kuri kaminuza",
//       loginRequired: "Kwinjira birakenewe",
//       loginToOrder: "Nyamuneka winjire mbere yo gutegura iyi nzu",
//       orderNow: "Tegura Nono",
//       loginNow: "Kwinjira",
//       registerNow: "Iyandikisha",
//       or: "cyangwa",
//       houseDetails: "Ibisobanuro by'azu",
//       orderHouse: "Tegura iyi nzu",
//       priceInRWF: "Igiciro mu Rwanda",
//       code: "Kode y'umudugudu",
//       aboutProject: "Kubyerekeye Umushinga Inyumba",
//       ourMission: "Intego yacu",
//       ourVision: "Icyerekezo cyacu",
//       ourExpectations: "Ibyo twiteze",
//       whatWeProvide: "Ibyo dutanga",
//       yearsOfExperience: "Imyaka y'ubumenyi",
//       happyStudents: "Abanyeshuri bishimye",
//       partnerUniversities: "Kaminuza zikorana natwe",
//       propertiesAvailable: "Amazu ariboneka",
//       learnMore: "Menya byinshi kuri Umushinga Inyumba",
//       ourStory: "Amateka yacu",
//       whyChooseUs: "Kuki utuhitamo",
//       ourValues: "Indangagaciro zacu",
//       testimonials: "Ibyo abanyeshuri bacu bavuga",
//       viewAllProperties: "Reba amazu yose",
//       filterBy: "Tungura ukurikije",
//       priceRange: "Igiciro kiri hagati",
//       minPrice: "Igiciro gito",
//       maxPrice: "Igiciro kinini",
//       applyFilters: "Kora iyo myunyu",
//       resetFilters: "Kuraho iyo myunyu",
//       sortBy: "Tondeka ukurikije",
//       priceLowHigh: "Igiciro: Gito kuri kinini",
//       priceHighLow: "Igiciro: Kinini kuri gito",
//       ratingHighLow: "Amanota: Hejuru kuri hasi",
//       nearestFirst: "Buri hafi mbere",
//       email: "Imeli",
//       password: "Ijambo ryibanga",
//       confirmPassword: "Emeza ijambo ryibanga",
//       phone: "Telefone",
//       showLess: "Garuka",
//       save: "Bika",
//       saving: "Birabikwa...",
//       saveSuccess: "Byabitswe neza!",
//       saveFailed: "Ntabwo byabitswe. Ongera ugerageze.",
//     },
//   };
//   return translations[lang as keyof typeof translations] || translations.en;
// };

// // ============================================================
// // 3. MAIN COMPONENT
// // ============================================================

// export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
//   // Get language from cookies
//   const [language, setLanguage] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const t = getTranslations(language);

//   const categories = [
//     {
//       id: "all",
//       name: t.all || "All Houses",
//       icon: <HomeIcon />,
//       color: "from-[#FF385C] to-pink-400",
//     },
//     {
//       id: "student",
//       name: t.student || "Student Houses",
//       icon: <SchoolIcon />,
//       color: "from-blue-400 to-cyan-500",
//     },
//     {
//       id: "apartments",
//       name: t.apartments || "Apartments",
//       icon: <ApartmentIcon />,
//       color: "from-green-400 to-emerald-500",
//     },
//     {
//       id: "single",
//       name: t.single || "Single Rooms",
//       icon: <BedIcon />,
//       color: "from-orange-400 to-red-500",
//     },
//     {
//       id: "shared",
//       name: t.shared || "Shared Houses",
//       icon: <PeopleAltIcon />,
//       color: "from-purple-400 to-pink-500",
//     },
//     {
//       id: "furnished",
//       name: t.furnished || "Furnished",
//       icon: <HotelIcon />,
//       color: "from-yellow-400 to-amber-500",
//     },
//     {
//       id: "nearcampus",
//       name: t.nearcampus || "Near Campus",
//       icon: <LocationCityIcon />,
//       color: "from-teal-400 to-cyan-500",
//     },
//   ];

//   // Listen for language changes in cookies
//   useEffect(() => {
//     const handleCookieChange = () => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== language) {
//         setLanguage(newLang);
//       }
//     };

//     // Check for cookie changes every second (polling)
//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [language]);

//   // ===== State =====
//   const [searchLocation, setSearchLocation] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedUniversity, setSelectedUniversity] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedSector, setSelectedSector] = useState("");
//   const [selectedCell, setSelectedCell] = useState("");
//   const [selectedVillage, setSelectedVillage] = useState("");
//   const [maxMinutesFromCampus, setMaxMinutesFromCampus] = useState<number>(30);
//   const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
//   const [filteredHouses, setFilteredHouses] =
//     useState<StudentHouse[]>(studentHousesData);

//   const [minPrice, setMinPrice] = useState<number>(0);
//   const [maxPrice, setMaxPrice] = useState<number>(200000);
//   const [sortOption, setSortOption] = useState<string>("");

//   const [checkIn, setCheckIn] = useState<Date | null>(null);
//   const [checkOut, setCheckOut] = useState<Date | null>(null);
//   const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
//   const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const [studentCount, setStudentCount] = useState(2);

//   const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
//   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
//   const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
//   const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
//     useState(false);

//   const [selectedHouse, setSelectedHouse] = useState<StudentHouse | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const [favorites, setFavorites] = useState<number[]>(() => {
//     const saved = localStorage.getItem("favorites");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   // ===== Effects =====
//   useEffect(() => {
//     const filterHouses = () => {
//       let filtered = [...studentHousesData];

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
//             h.village.toLowerCase().includes(query) ||
//             h.province.toLowerCase().includes(query) ||
//             h.code_vil_1?.includes(query),
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
//             h.name.toLowerCase().includes(location) ||
//             h.province.toLowerCase().includes(location) ||
//             h.code_vil_1?.includes(location),
//         );
//       }

//       if (selectedUniversity) {
//         filtered = filtered.filter((h) => h.university === selectedUniversity);
//       }

//       if (selectedDistrict) {
//         filtered = filtered.filter((h) => h.district === selectedDistrict);
//       }

//       if (selectedSector) {
//         filtered = filtered.filter((h) => h.sector === selectedSector);
//       }

//       if (selectedCell) {
//         filtered = filtered.filter((h) => h.cell === selectedCell);
//       }

//       if (selectedVillage) {
//         filtered = filtered.filter((h) => h.village === selectedVillage);
//       }

//       if (maxMinutesFromCampus) {
//         filtered = filtered.filter(
//           (h) => h.minutesFromCampus <= maxMinutesFromCampus,
//         );
//       }

//       if (minPrice > 0) {
//         filtered = filtered.filter((h) => h.priceRWF >= minPrice);
//       }
//       if (maxPrice < 200000) {
//         filtered = filtered.filter((h) => h.priceRWF <= maxPrice);
//       }

//       if (sortOption === "priceLowHigh") {
//         filtered.sort((a, b) => a.priceRWF - b.priceRWF);
//       } else if (sortOption === "priceHighLow") {
//         filtered.sort((a, b) => b.priceRWF - a.priceRWF);
//       } else if (sortOption === "ratingHighLow") {
//         filtered.sort((a, b) => b.rating - a.rating);
//       } else if (sortOption === "nearestFirst") {
//         filtered.sort((a, b) => a.minutesFromCampus - b.minutesFromCampus);
//       }

//       setFilteredHouses(filtered);
//       setCurrentPage(1);
//     };

//     filterHouses();
//   }, [
//     selectedCategory,
//     searchQuery,
//     searchLocation,
//     selectedUniversity,
//     selectedDistrict,
//     selectedSector,
//     selectedCell,
//     selectedVillage,
//     maxMinutesFromCampus,
//     minPrice,
//     maxPrice,
//     sortOption,
//   ]);

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     if (isPropertyModalOpen || isLoginRequiredModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isPropertyModalOpen, isLoginRequiredModalOpen]);

//   // ===== API Call Function =====
//   const saveOrderToAPI = async (orderData: any) => {
//     try {
//       const response = await fetch("https://your-api-endpoint.com/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error saving order:", error);
//       throw error;
//     }
//   };

//   // ===== Handlers =====
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
//       district: selectedDistrict,
//       sector: selectedSector,
//       cell: selectedCell,
//       village: selectedVillage,
//       maxMinutes: maxMinutesFromCampus,
//       minPrice,
//       maxPrice,
//       sort: sortOption,
//     };

//     if (onSearch) {
//       onSearch(searchParams);
//     }

//     toast.info(
//       `🔍 ${t.search}: ${searchLocation || selectedUniversity || "All universities in Rwanda"}`,
//     );
//     setIsLocationModalOpen(false);
//     setIsDatePickerOpen(false);
//     setIsGuestModalOpen(false);
//     setIsAdvancedSearchOpen(false);
//   };

//   const clearAllFilters = () => {
//     setSearchLocation("");
//     setSearchQuery("");
//     setSelectedCategory("all");
//     setSelectedUniversity("");
//     setSelectedDistrict("");
//     setSelectedSector("");
//     setSelectedCell("");
//     setSelectedVillage("");
//     setMaxMinutesFromCampus(30);
//     setCheckIn(null);
//     setCheckOut(null);
//     setStudentCount(2);
//     setMinPrice(0);
//     setMaxPrice(200000);
//     setSortOption("");
//     toast.info("🧹 All filters cleared");
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

//   const handleOrderClick = () => {
//     setIsLoginRequiredModalOpen(true);
//   };

//   const handleSaveOrder = async () => {
//     if (!selectedHouse) return;

//     setIsSaving(true);
//     try {
//       const orderData = {
//         houseId: selectedHouse.id,
//         houseName: selectedHouse.name,
//         priceRWF: selectedHouse.priceRWF,
//         nights: selectedHouse.nights,
//         totalPrice: selectedHouse.priceRWF * selectedHouse.nights,
//         university: selectedHouse.university,
//         district: selectedHouse.district,
//         sector: selectedHouse.sector,
//         cell: selectedHouse.cell,
//         village: selectedHouse.village,
//         checkIn: checkIn ? checkIn.toISOString() : null,
//         checkOut: checkOut ? checkOut.toISOString() : null,
//         students: studentCount,
//         timestamp: new Date().toISOString(),
//       };

//       const response = await saveOrderToAPI(orderData);
//       toast.success(`✅ ${t.saveSuccess}`);
//       console.log("Order saved successfully:", response);
//       setIsLoginRequiredModalOpen(false);
//       closeHouseModal();
//     } catch (error) {
//       toast.error(`❌ ${t.saveFailed}`);
//       console.error("Save error:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getTranslatedType = (type: string) => {
//     if (type === "Room") return t.room;
//     if (type === "Apartment") return t.apartment;
//     if (type === "House") return t.student;
//     return type;
//   };

//   const getLocationInfo = (house: StudentHouse) => {
//     let location = `${house.village}, ${house.cell}, ${house.sector}, ${house.district} (${house.province})`;
//     if (house.code_vil_1) {
//       location += ` • Code: ${house.code_vil_1}`;
//     }
//     return location;
//   };

//   const getUniversityColor = (university: string) => {
//     const colors: { [key: string]: string } = {
//       "UR - CST (Science & Tech)": "bg-blue-100 text-blue-800",
//       "UR - CBE (Business & Econ)": "bg-yellow-100 text-yellow-800",
//       "UR - CMHS (Health Sciences)": "bg-red-100 text-red-800",
//       "IPRC Kigali": "bg-orange-100 text-orange-800",
//       "University of Kigali (UoK)": "bg-cyan-100 text-cyan-800",
//       "Kigali Independent Univ. (ULK)": "bg-amber-100 text-amber-800",
//       "Adventist Univ. (AUCA)": "bg-lime-100 text-lime-800",
//       "Carnegie Mellon (CMU-Africa)": "bg-cyan-100 text-cyan-800",
//       "African Leadership Univ. (ALU)": "bg-indigo-100 text-indigo-800",
//       "JKUAT - Rwanda Campus": "bg-blue-100 text-blue-800",
//       "Mount Kigali University": "bg-purple-100 text-purple-800",
//       "UR - Huye Campus": "bg-purple-100 text-purple-800",
//       "IPRC Huye": "bg-pink-100 text-pink-800",
//       "Catholic Institute (ICK)": "bg-rose-100 text-rose-800",
//       "University of Gitwe": "bg-emerald-100 text-emerald-800",
//       "Catholic University of Rwanda": "bg-rose-100 text-rose-800",
//       "ILPD (Law Institute)": "bg-amber-100 text-amber-800",
//       "UR - CAVM (Agriculture)": "bg-green-100 text-green-800",
//       "IPRC Musanze": "bg-orange-100 text-orange-800",
//       "INES-Ruhengeri": "bg-blue-100 text-blue-800",
//       "Univ. of Global Health Equity": "bg-sky-100 text-sky-800",
//       "Univ. of Tech & Arts (UTAB)": "bg-violet-100 text-violet-800",
//       "IPRC Tumba": "bg-fuchsia-100 text-fuchsia-800",
//       "UR - CE (Education)": "bg-indigo-100 text-indigo-800",
//       "UR - Nyagatare Campus": "bg-teal-100 text-teal-800",
//       "IPRC Ngoma": "bg-rose-100 text-rose-800",
//       "RICA (Conservation Agric.)": "bg-lime-100 text-lime-800",
//       "Rwanda Military Academy": "bg-stone-100 text-stone-800",
//       "IPRC Karongi": "bg-rose-100 text-rose-800",
//       "IPRC Rusizi": "bg-teal-100 text-teal-800",
//       "UTB (Tourism & Business)": "bg-slate-100 text-slate-800",
//       "Kibogora Polytechnic": "bg-emerald-100 text-emerald-800",
//     };
//     return colors[university] || "bg-gray-100 text-gray-800";
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "booked":
//         return "bg-red-100 text-red-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "available":
//         return t.statusAvailable;
//       case "booked":
//         return t.statusBooked;
//       case "pending":
//         return t.statusPending;
//       default:
//         return status;
//     }
//   };

//   const uniqueUniversities = [
//     ...new Set(studentHousesData.map((h) => h.university)),
//   ];
//   const uniqueDistricts = [
//     ...new Set(studentHousesData.map((h) => h.district)),
//   ];
//   const uniqueSectors = [...new Set(studentHousesData.map((h) => h.sector))];
//   const uniqueCells = [...new Set(studentHousesData.map((h) => h.cell))];
//   const uniqueVillages = [...new Set(studentHousesData.map((h) => h.village))];

//   return (
//     <div className="w-full">
//       {/* ===== PROJECT HEADER WITH PERMANENT ABOUT SECTION - WHITE BACKGROUND ===== */}
//       <div className="bg-white py-8 md:py-12 border-b border-gray-200">
//           <div className="text-center mb-8">

//             <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
//               {language === "rw"
//                 ? "GUKORA URUBUGA ABANYESHURI BA KAMINUZA BAZAJYA BAJYAHO BAKABONA AMAZU YO GUKONDESHA KUBURYO BUBOREHEYE"
//                 : language === "fr"
//                   ? "Location de maisons pour étudiants près des universités au Rwanda"
//                   : "Student housing rental platform near universities in Rwanda"}
//             </p>
//           </div>
//       </div>

//       {/* ===== SEARCH BAR ===== */}
//       <div className="relative z-20 -mt-6 px-4">
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="bg-white rounded-2xl shadow-2xl p-4 md:p-5"
//           >
//             <div className="flex flex-col sm:flex-row gap-2">
//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsLocationModalOpen(true)}
//                   className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
//                 >
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.where}
//                   </div>
//                   <div className="text-sm sm:text-base text-gray-700 truncate">
//                     <SchoolIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
//                     {searchLocation ||
//                       selectedUniversity ||
//                       "Any university in Rwanda"}
//                   </div>
//                 </button>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsDatePickerOpen(true)}
//                   className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
//                 >
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.when}
//                   </div>
//                   <div className="text-sm sm:text-base text-gray-700 truncate">
//                     {getDateRange()}
//                   </div>
//                 </button>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsGuestModalOpen(true)}
//                   className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
//                 >
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.who}
//                   </div>
//                   <div className="text-sm sm:text-base text-gray-700 truncate">
//                     <PeopleAltIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
//                     {getStudentCount()}
//                   </div>
//                 </button>
//               </div>

//               <div className="sm:self-center flex gap-1">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSearch}
//                   className="bg-[#FF385C] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF385C]/30 text-sm"
//                 >
//                   <SearchIcon className="w-4 h-4" />
//                   <span>{t.search}</span>
//                 </motion.button>
//                 <button
//                   onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
//                   className="bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
//                 >
//                   <FilterListIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <AnimatePresence>
//               {isAdvancedSearchOpen && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="border-t border-gray-200 mt-3 pt-3 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.university}
//                       </label>
//                       <select
//                         value={selectedUniversity}
//                         onChange={(e) => setSelectedUniversity(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">All Universities</option>
//                         {uniqueUniversities.map((uni) => (
//                           <option key={uni} value={uni}>
//                             {uni}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.district}
//                       </label>
//                       <select
//                         value={selectedDistrict}
//                         onChange={(e) => setSelectedDistrict(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">All Districts</option>
//                         {uniqueDistricts.map((d) => (
//                           <option key={d} value={d}>
//                             {d}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.sector}
//                       </label>
//                       <select
//                         value={selectedSector}
//                         onChange={(e) => setSelectedSector(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">All Sectors</option>
//                         {uniqueSectors.map((s) => (
//                           <option key={s} value={s}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.cell}
//                       </label>
//                       <select
//                         value={selectedCell}
//                         onChange={(e) => setSelectedCell(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">All Cells</option>
//                         {uniqueCells.map((c) => (
//                           <option key={c} value={c}>
//                             {c}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.village}
//                       </label>
//                       <select
//                         value={selectedVillage}
//                         onChange={(e) => setSelectedVillage(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">All Villages</option>
//                         {uniqueVillages.map((v) => (
//                           <option key={v} value={v}>
//                             {v}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.minutesFromCampus}
//                       </label>
//                       <div className="flex items-center gap-2 mt-1">
//                         <input
//                           type="range"
//                           min="0"
//                           max="60"
//                           value={maxMinutesFromCampus}
//                           onChange={(e) =>
//                             setMaxMinutesFromCampus(parseInt(e.target.value))
//                           }
//                           className="flex-1 accent-[#FF385C]"
//                         />
//                         <span className="text-sm font-medium text-gray-700 min-w-[30px]">
//                           {maxMinutesFromCampus}m
//                         </span>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.priceRange}
//                       </label>
//                       <div className="flex items-center gap-2 mt-1">
//                         <input
//                           type="number"
//                           value={minPrice}
//                           onChange={(e) => setMinPrice(Number(e.target.value))}
//                           placeholder={t.minPrice}
//                           className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
//                         />
//                         <span className="text-gray-400">-</span>
//                         <input
//                           type="number"
//                           value={maxPrice}
//                           onChange={(e) => setMaxPrice(Number(e.target.value))}
//                           placeholder={t.maxPrice}
//                           className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.sortBy}
//                       </label>
//                       <select
//                         value={sortOption}
//                         onChange={(e) => setSortOption(e.target.value)}
//                         className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
//                       >
//                         <option value="">Default</option>
//                         <option value="priceLowHigh">{t.priceLowHigh}</option>
//                         <option value="priceHighLow">{t.priceHighLow}</option>
//                         <option value="ratingHighLow">{t.ratingHighLow}</option>
//                         <option value="nearestFirst">{t.nearestFirst}</option>
//                       </select>
//                     </div>

//                     <div className="flex items-end">
//                       <button
//                         onClick={clearAllFilters}
//                         className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
//                       >
//                         <ClearIcon className="w-4 h-4" />
//                         {t.resetFilters}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>

//       {/* ===== CATEGORIES ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
//           {categories.map((category) => (
//             <motion.button
//               key={category.id}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSelectedCategory(category.id)}
//               className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
//                 selectedCategory === category.id
//                   ? "border-b-2 border-[#FF385C] text-[#FF385C]"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <div
//                   className={`w-6 h-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white`}
//                 >
//                   {React.cloneElement(category.icon, {
//                     className: "w-3.5 h-3.5",
//                   })}
//                 </div>
//               </div>
//               <span className="text-xs font-medium whitespace-nowrap">
//                 {category.name}
//               </span>
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       {/* ===== SEARCH INPUT ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
//         <div className="relative max-w-sm">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder={t.searchProperties}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] placeholder-gray-400"
//           />
//         </div>
//       </div>

//       {/* ===== HOUSES GRID ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-wrap justify-between items-center mb-6">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">
//               {filteredHouses.length} {t.popularHomes}
//             </h2>
//             {selectedUniversity && (
//               <p className="text-sm text-gray-500 mt-1">
//                 <SchoolIcon className="w-4 h-4 inline mr-1" />
//                 {selectedUniversity}
//               </p>
//             )}
//             {selectedDistrict && (
//               <p className="text-sm text-gray-500 mt-1">
//                 <LocationCityIcon className="w-4 h-4 inline mr-1" />
//                 {selectedDistrict}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">
//               <BookmarkIcon className="w-4 h-4 inline mr-1" />
//               {favorites.length} {t.favorites}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//           {paginatedHouses.map((house) => (
//             <motion.div
//               key={house.id}
//               whileHover={{ y: -4 }}
//               transition={{ duration: 0.3 }}
//               className="group cursor-pointer"
//               onClick={() => openHouseModal(house)}
//             >
//               <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={house.image}
//                     alt={house.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute top-2 right-2 flex gap-1">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(house.id);
//                       }}
//                       className="bg-white rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
//                     >
//                       {favorites.includes(house.id) ? (
//                         <FavoriteIcon className="w-4 h-4 text-[#FF385C]" />
//                       ) : (
//                         <FavoriteBorderIcon className="w-4 h-4 text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                   <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
//                     {getTranslatedType(house.type)}
//                   </div>
//                   <div className="absolute top-2 left-2">
//                     <span
//                       className={`px-2 py-0.5 rounded text-xs font-medium ${getUniversityColor(house.university)}`}
//                     >
//                       {house.university}
//                     </span>
//                   </div>
//                   <div className="absolute top-2 left-1/2 -translate-x-1/2">
//                     <span
//                       className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(house.bookingStatus)}`}
//                     >
//                       {getStatusText(house.bookingStatus)}
//                     </span>
//                   </div>
//                   {house.code_vil_1 && (
//                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px]">
//                       Code: {house.code_vil_1}
//                     </div>
//                   )}
//                   <div className="absolute bottom-2 left-20 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
//                     {house.minutesFromCampus}m from campus
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="min-w-0 flex-1">
//                       <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
//                         {house.name}
//                       </h3>
//                       <p className="text-xs text-gray-500 mt-0.5 truncate">
//                         <LocationOnIcon className="w-3 h-3 inline mr-0.5" />
//                         {house.village}, {house.sector}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-xs text-gray-500">
//                           {house.rooms} {t.rooms}
//                         </span>
//                         <span className="text-xs text-gray-300">•</span>
//                         <span className="text-xs text-gray-500">
//                           {house.bathrooms} {t.bathrooms}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end flex-shrink-0 ml-2">
//                       <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
//                         <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-current" />
//                         {house.rating}
//                       </div>
//                       <p className="text-xs font-semibold text-[#FF385C]">
//                         {house.priceRWF.toLocaleString()} RWF
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-wrap items-center justify-center gap-2 mt-10"
//           >
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//               }`}
//             >
//               <ArrowBackIcon className="w-4 h-4" />
//               {t.prev}
//             </button>

//             <div className="flex items-center gap-1">
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
//                         className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
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
//                         className="w-9 h-9 flex items-center justify-center text-gray-400"
//                       >
//                         …
//                       </span>
//                     );
//                   }
//                   if (page === totalPages - 1 && currentPage < totalPages - 2) {
//                     return (
//                       <span
//                         key="ellipsis-end"
//                         className="w-9 h-9 flex items-center justify-center text-gray-400"
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
//               className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 currentPage === totalPages
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//               }`}
//             >
//               {t.next}
//               <ArrowForwardIcon className="w-4 h-4" />
//             </button>
//           </motion.div>
//         )}

//         {filteredHouses.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">{t.noResults}</p>
//           </div>
//         )}
//       </div>

//       {/* ============================================================
//           PROPERTY DETAIL MODAL
//           ============================================================ */}
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
//               className="fixed inset-4 z-[301] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="relative">
//                   <img
//                     src={selectedHouse.image}
//                     alt={selectedHouse.name}
//                     className="w-full h-56 md:h-64 object-cover"
//                   />
//                   <button
//                     onClick={closeHouseModal}
//                     className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                   >
//                     <CloseIcon className="w-5 h-5 text-gray-800" />
//                   </button>
//                   <button
//                     onClick={() => toggleFavorite(selectedHouse.id)}
//                     className="absolute top-3 right-14 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                   >
//                     {favorites.includes(selectedHouse.id) ? (
//                       <FavoriteIcon className="w-5 h-5 text-[#FF385C]" />
//                     ) : (
//                       <FavoriteBorderIcon className="w-5 h-5 text-gray-800" />
//                     )}
//                   </button>
//                   <div className="absolute bottom-3 left-3">
//                     <span
//                       className={`px-3 py-1 rounded text-xs font-medium ${getUniversityColor(selectedHouse.university)}`}
//                     >
//                       <SchoolIcon className="w-4 h-4 inline mr-1" />
//                       {selectedHouse.university}
//                     </span>
//                   </div>
//                   <div className="absolute bottom-3 right-3">
//                     <span
//                       className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(selectedHouse.bookingStatus)}`}
//                     >
//                       {getStatusText(selectedHouse.bookingStatus)}
//                     </span>
//                   </div>
//                   {selectedHouse.code_vil_1 && (
//                     <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-xs">
//                       📍 Code: {selectedHouse.code_vil_1}
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
//                   <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-2">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {selectedHouse.name}
//                       </h3>
//                       <p className="text-sm text-gray-500 mt-1">
//                         <LocationOnIcon className="w-4 h-4 inline mr-0.5" />
//                         {getLocationInfo(selectedHouse)}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {selectedHouse.description}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-1 text-lg font-medium text-gray-700 flex-shrink-0">
//                       <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
//                       {selectedHouse.rating}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
//                       <AccessTimeIcon className="w-3 h-3 inline mr-0.5" />
//                       {selectedHouse.minutesFromCampus}m from campus
//                     </span>
//                     <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
//                       <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
//                       Built {selectedHouse.yearBuilt}
//                     </span>
//                     <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
//                       <AttachMoneyIcon className="w-3 h-3 inline mr-0.5" />
//                       {selectedHouse.priceRWF.toLocaleString()} RWF/month
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 mb-4">
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.province}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         {selectedHouse.province}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.district}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         {selectedHouse.district}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.sector}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         {selectedHouse.sector}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.cell}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         {selectedHouse.cell}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-3 col-span-2">
//                       <p className="text-xs text-gray-500">{t.village}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         {selectedHouse.village}
//                       </p>
//                       {selectedHouse.code_vil_1 && (
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           Code: {selectedHouse.code_vil_1}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 mb-4">
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.rooms}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         <BedIcon className="w-4 h-4 inline mr-1" />
//                         {selectedHouse.rooms}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       <p className="text-xs text-gray-500">{t.bathrooms}</p>
//                       <p className="text-sm font-semibold text-gray-900">
//                         <BathroomIcon className="w-4 h-4 inline mr-1" />
//                         {selectedHouse.bathrooms}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <h4 className="font-semibold text-sm text-gray-900 mb-2">
//                       <InfoIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
//                       {t.features}
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedHouse.features?.map((feature) => (
//                         <span
//                           key={feature}
//                           className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Owner section removed as requested */}

//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <h4 className="font-semibold text-sm text-gray-900 mb-2">
//                       {t.amenities}
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedHouse.amenities?.map((amenity) => {
//                         let icon = (
//                           <CheckCircleIcon className="w-4 h-4 text-[#FF385C]" />
//                         );
//                         if (amenity === "WiFi")
//                           icon = <WifiIcon className="w-4 h-4 text-blue-500" />;
//                         if (amenity === "Kitchen" || amenity === "Kitchenette")
//                           icon = (
//                             <KitchenIcon className="w-4 h-4 text-orange-500" />
//                           );
//                         if (amenity === "Parking")
//                           icon = (
//                             <LocalParkingIcon className="w-4 h-4 text-green-500" />
//                           );
//                         if (amenity === "Security")
//                           icon = (
//                             <SecurityIcon className="w-4 h-4 text-red-500" />
//                           );
//                         return (
//                           <span
//                             key={amenity}
//                             className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
//                           >
//                             {icon}
//                             {amenity}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500">
//                           {t.price} ({t.priceInRWF})
//                         </p>
//                         <p className="text-2xl font-bold text-gray-900">
//                           {selectedHouse.priceRWF.toLocaleString()} RWF
//                           <span className="text-sm font-normal text-gray-500">
//                             {" "}
//                             {t.perNight}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           ${selectedHouse.price} USD • {selectedHouse.nights}{" "}
//                           {t.nightsTotal}
//                         </p>
//                       </div>
//                       {selectedHouse.bookingStatus === "available" && (
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleOrderClick();
//                           }}
//                           className="bg-[#FF385C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center gap-2"
//                         >
//                           <LoginIcon className="w-4 h-4" />
//                           {t.orderNow}
//                         </motion.button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ============================================================
//           LOGIN REQUIRED MODAL (Simplified - no login/register forms)
//           ============================================================ */}
//       <AnimatePresence>
//         {isLoginRequiredModalOpen && selectedHouse && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[350]"
//               onClick={() => setIsLoginRequiredModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-4 z-[351] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">{t.loginRequired}</h3>
//                   <button
//                     onClick={() => setIsLoginRequiredModalOpen(false)}
//                     className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="p-6">
//                   <div className="text-center mb-6">
//                     <div className="w-20 h-20 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <LoginIcon className="w-10 h-10 text-[#FF385C]" />
//                     </div>
//                     <h4 className="text-xl font-bold text-gray-900 mb-2">
//                       {t.loginRequired}
//                     </h4>
//                     <p className="text-sm text-gray-600">{t.loginToOrder}</p>
//                     <div className="mt-2 p-3 bg-gray-50 rounded-lg">
//                       <p className="text-xs text-gray-500">
//                         <strong>{selectedHouse.name}</strong> •{" "}
//                         {selectedHouse.priceRWF.toLocaleString()} RWF/month
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSaveOrder}
//                       disabled={isSaving}
//                       className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {isSaving ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           {t.saving}
//                         </>
//                       ) : (
//                         <>
//                           <SaveIcon className="w-4 h-4" />
//                           {t.save}
//                         </>
//                       )}
//                     </motion.button>
//                     <button
//                       onClick={() => setIsLoginRequiredModalOpen(false)}
//                       className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                     >
//                       {t.done}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ============================================================
//           LOCATION MODAL
//           ============================================================ */}
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
//               className="fixed inset-4 z-[201] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
//                 <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">{t.selectLocation}</h3>
//                   <button
//                     onClick={() => setIsLocationModalOpen(false)}
//                     className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
//                   <div className="relative mb-4">
//                     <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder={t.searchDestinations}
//                       value={searchLocation}
//                       onChange={(e) => setSearchLocation(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
//                       autoFocus
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
//                       <SchoolIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.popularLocations}
//                     </h4>
//                     <div className="max-h-40 overflow-y-auto space-y-1 border rounded-lg p-1">
//                       {uniqueUniversities.length > 0 ? (
//                         uniqueUniversities.map((uni) => (
//                           <button
//                             key={uni}
//                             onClick={() => {
//                               setSelectedUniversity(uni);
//                               setSearchLocation(uni);
//                               setSelectedDistrict("");
//                               setIsLocationModalOpen(false);
//                             }}
//                             className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
//                           >
//                             <SchoolIcon className="w-4 h-4 text-[#FF385C]" />
//                             <span>{uni}</span>
//                           </button>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-400 px-3 py-2">
//                           No universities found
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
//                       <LocationCityIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.districtLabel || "Districts"}
//                     </h4>
//                     <div className="max-h-40 overflow-y-auto space-y-1 border rounded-lg p-1">
//                       {uniqueDistricts.length > 0 ? (
//                         uniqueDistricts.map((district) => (
//                           <button
//                             key={district}
//                             onClick={() => {
//                               setSelectedDistrict(district);
//                               setSearchLocation(district);
//                               setSelectedUniversity("");
//                               setIsLocationModalOpen(false);
//                             }}
//                             className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
//                           >
//                             <LocationCityIcon className="w-4 h-4 text-[#FF385C]" />
//                             <span>{district}</span>
//                           </button>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-400 px-3 py-2">
//                           No districts found
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ============================================================
//           DATE PICKER MODAL
//           ============================================================ */}
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
//               className="fixed inset-4 z-[201] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
//                   <h3 className="text-lg font-semibold">{t.when}</h3>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={clearDates}
//                       className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                     >
//                       {t.clear}
//                     </button>
//                     <button
//                       onClick={() => setIsDatePickerOpen(false)}
//                       className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <CloseIcon className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4 overflow-y-auto">
//                   <div className="flex items-center justify-between mb-4">
//                     <button
//                       onClick={() => changeMonth(-1)}
//                       className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <ArrowBackIcon className="w-5 h-5" />
//                     </button>
//                     <h4 className="font-semibold">
//                       {new Date(currentYear, currentMonth).toLocaleString(
//                         "default",
//                         { month: "long", year: "numeric" },
//                       )}
//                     </h4>
//                     <button
//                       onClick={() => changeMonth(1)}
//                       className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <ArrowForwardIcon className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-7 gap-1 mb-2">
//                     {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//                       <div
//                         key={day}
//                         className="text-center text-xs font-medium text-gray-500 py-1"
//                       >
//                         {day}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-7 gap-1">
//                     {renderCalendar()}
//                   </div>
//                   <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4 gap-2">
//                     <div className="flex flex-wrap gap-2">
//                       {tempCheckIn && (
//                         <span className="text-sm">
//                           {t.checkIn}: {tempCheckIn.toLocaleDateString()}
//                         </span>
//                       )}
//                       {tempCheckOut && (
//                         <span className="text-sm">
//                           {t.checkOut}: {tempCheckOut.toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       onClick={applyDates}
//                       disabled={!tempCheckIn || !tempCheckOut}
//                       className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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

//       {/* ============================================================
//           GUEST MODAL
//           ============================================================ */}
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
//               className="fixed inset-4 z-[201] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
//                 <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">
//                     <PeopleAltIcon className="w-5 h-5 inline mr-2 text-[#FF385C]" />
//                     {t.guests}
//                   </h3>
//                   <button
//                     onClick={() => setIsGuestModalOpen(false)}
//                     className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <PeopleAltIcon className="w-5 h-5 text-gray-500" />
//                       <span className="font-medium">
//                         {t.students || "Students"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() =>
//                           setStudentCount(Math.max(1, studentCount - 1))
//                         }
//                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//                       >
//                         <RemoveIcon className="w-4 h-4" />
//                       </button>
//                       <span className="w-6 text-center font-medium">
//                         {studentCount}
//                       </span>
//                       <button
//                         onClick={() => setStudentCount(studentCount + 1)}
//                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//                       >
//                         <AddIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => {
//                       setIsGuestModalOpen(false);
//                       toast.success(`👥 ${getStudentCount()}`);
//                     }}
//                     className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
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
import Cookies from "js-cookie";

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
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

// ============================================================
// 1. DATA WITH MULTIPLE IMAGES
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
  images: string[];
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
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
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
    name: "Sunrise Student Hostel",
    type: "Hostel",
    price: 60,
    priceRWF: 78000,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Sunrise",
    code_vil_1: "11010107",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Affordable student hostel with shared facilities.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area", "Common Room"],
    owner: "Uwimana Grace",
    contact: "+250 788789012",
    bookingStatus: "available",
    minutesFromCampus: 12,
    features: ["Study Desk", "Common Room"],
    yearBuilt: 2020,
  },
  {
    id: 5,
    name: "Peaceful Student Housing",
    type: "House",
    price: 90,
    priceRWF: 117000,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Peaceful",
    code_vil_1: "11010108",
    rooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
    description: "Peaceful student housing with garden and parking.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
    owner: "Rukundo Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
  },
  {
    id: 6,
    name: "Green Valley Student Apartments",
    type: "Apartment",
    price: 75,
    priceRWF: 97500,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Green Valley",
    code_vil_1: "11010109",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Green Valley apartments with scenic views and study spaces.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Balcony"],
    owner: "Mugisha David",
    contact: "+250 788012345",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2021,
  },
  {
    id: 7,
    name: "Kigali Heights Student Lodge",
    type: "House",
    price: 100,
    priceRWF: 130000,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Kigali Heights",
    code_vil_1: "11010110",
    rooms: 5,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
    description: "Luxury student housing in Kigali Heights, close to campus.",
    amenities: ["WiFi", "Kitchen", "Garden", "Security", "Parking", "Study Room"],
    owner: "Kagame Peter",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 4,
    features: ["Solar Panels", "Water Heater", "Study Desk", "Garden"],
    yearBuilt: 2023,
  },
  {
    id: 8,
    name: "Ruhango Student Village",
    type: "House",
    price: 80,
    priceRWF: 104000,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Ruhango",
    code_vil_1: "11010111",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Student village with community atmosphere.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Laundry"],
    owner: "Niyomugabo Eric",
    contact: "+250 788234567",
    bookingStatus: "available",
    minutesFromCampus: 11,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
  },
  {
    id: 9,
    name: "Muhanga Student Residence",
    type: "Apartment",
    price: 65,
    priceRWF: 84500,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Muhanga",
    code_vil_1: "11010112",
    rooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Affordable residence for students.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Niyonzima Anne",
    contact: "+250 788345678",
    bookingStatus: "available",
    minutesFromCampus: 13,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  {
    id: 10,
    name: "Nyabugogo Student House",
    type: "House",
    price: 88,
    priceRWF: 114400,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Nyabugogo",
    code_vil_1: "11010113",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student house in Nyabugogo area, accessible to campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Habineza James",
    contact: "+250 788456789",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Parking", "Water Heater"],
    yearBuilt: 2022,
  },
  {
    id: 11,
    name: "Kicukiro Student Hostel",
    type: "Hostel",
    price: 55,
    priceRWF: 71500,
    nights: 30,
    rating: 4.3,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Kicukiro",
    code_vil_1: "11010114",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for students.",
    amenities: ["WiFi", "Shared Kitchen", "Common Room", "Study Area"],
    owner: "Uwera Sarah",
    contact: "+250 788567890",
    bookingStatus: "available",
    minutesFromCampus: 14,
    features: ["Common Room"],
    yearBuilt: 2019,
  },
  {
    id: 12,
    name: "Kimihurura Student Apartments",
    type: "Apartment",
    price: 78,
    priceRWF: 101400,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Kimihurura",
    code_vil_1: "11010115",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments in Kimihurura, near amenities and campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Balcony"],
    owner: "Rwema Daniel",
    contact: "+250 788678901",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
  },
  {
    id: 13,
    name: "Remera Student Lodge",
    type: "House",
    price: 92,
    priceRWF: 119600,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Remera",
    code_vil_1: "11010116",
    rooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
    description: "Spacious lodge in Remera with all amenities.",
    amenities: ["WiFi", "Kitchen", "Garden", "Security", "Parking", "Study Room"],
    owner: "Muhire Emmanuel",
    contact: "+250 788789012",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Solar Panels", "Water Heater"],
    yearBuilt: 2022,
  },
  {
    id: 14,
    name: "Kacyiru Student Village",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Kacyiru",
    code_vil_1: "11010117",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student village in Kacyiru with community facilities.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Laundry"],
    owner: "Ishimwe Grace",
    contact: "+250 788890123",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2021,
  },
  {
    id: 15,
    name: "Gikondo Student Residence",
    type: "Apartment",
    price: 68,
    priceRWF: 88400,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Gikondo",
    code_vil_1: "11010118",
    rooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Cozy residence in Gikondo area, accessible to campus.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    minutesFromCampus: 12,
    features: ["Study Desk"],
    yearBuilt: 2020,
  },
  {
    id: 16,
    name: "Kanombe Student House",
    type: "House",
    price: 82,
    priceRWF: 106600,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Kanombe",
    code_vil_1: "11010119",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student house in Kanombe, peaceful area.",
    amenities: ["WiFi", "Kitchen", "Garden", "Security", "Parking"],
    owner: "Mukeshimana Marie",
    contact: "+250 788012345",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
  },
  {
    id: 17,
    name: "Nyarutarama Student Lodge",
    type: "House",
    price: 98,
    priceRWF: 127400,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Nyarutarama",
    code_vil_1: "11010120",
    rooms: 5,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
    description: "Premium student lodge in Nyarutarama area.",
    amenities: ["WiFi", "Kitchen", "Garden", "Security", "Parking", "Study Room", "Laundry"],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Solar Panels", "Water Heater", "Study Desk", "Garden", "BBQ Area"],
    yearBuilt: 2023,
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
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
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
    name: "Musanze Student Village",
    type: "House",
    price: 75,
    priceRWF: 97500,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "INES-Ruhengeri",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Cyabararika",
    village: "Musanze",
    code_vil_1: "43080102",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Student village in Musanze, close to INES campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Area", "Laundry"],
    owner: "Rutayisire John",
    contact: "+250 788234567",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Water Heater", "Study Desk"],
    yearBuilt: 2021,
  },
  {
    id: 20,
    name: "Ruhengeri Student Apartments",
    type: "Apartment",
    price: 70,
    priceRWF: 91000,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "INES-Ruhengeri",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Cyabararika",
    village: "Ruhengeri",
    code_vil_1: "43080103",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments in Ruhengeri, close to campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Uwimana Jeanne",
    contact: "+250 788345678",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2020,
  },
];

// ============================================================
// 2. BOOKING TYPES
// ============================================================

interface BookingStep1Data {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  university: string;
  studentId: string;
  purpose: string;
}

interface BookingStep2Data {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  specialRequests: string;
}

interface BookingStep3Data {
  paymentMethod: "momo";
  momoNumber?: string;
  screenshot?: File | null;
  screenshotPreview?: string;
}

interface BookingData {
  step1: BookingStep1Data;
  step2: BookingStep2Data;
  step3: BookingStep3Data;
}

interface Step1Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  university?: string;
  studentId?: string;
  purpose?: string;
}

interface Step2Errors {
  checkIn?: string;
  checkOut?: string;
  nights?: string;
  guests?: string;
  specialRequests?: string;
}

interface Step3Errors {
  momoNumber?: string;
  screenshot?: string;
}

interface Step1Touched {
  fullName: boolean;
  email: boolean;
  phone: boolean;
  idNumber: boolean;
  university: boolean;
  studentId: boolean;
  purpose: boolean;
}

interface Step2Touched {
  checkIn: boolean;
  checkOut: boolean;
  nights: boolean;
  guests: boolean;
  specialRequests: boolean;
}

interface Step3Touched {
  momoNumber: boolean;
  screenshot: boolean;
}

// ============================================================
// 3. TRANSLATIONS
// ============================================================

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
      personalInfo: "Personal Information",
      payment: "Payment",
      fullName: "Full Name",
      idNumber: "ID Number",
      studentId: "Student ID",
      purpose: "Purpose of Stay",
      specialRequests: "Special Requests",
      paymentMethod: "Payment Method",
      momo: "MOMO",
      momoNumber: "MOMO Number",
      uploadScreenshot: "Upload Payment Screenshot",
      chooseFile: "Choose File",
      confirmBooking: "Confirm Booking",
      submitting: "Submitting...",
      bookingSuccess: "Booking confirmed successfully!",
      bookingFailed: "Failed to confirm booking",
      pleaseFillAllFields: "Please fill in all required fields",
      paymentInfo: "Payment Information",
      momoPaymentInstructions: "Please pay using the USSD code below:",
      momoNumberDisplay: "0783672782",
      momoCode: "*182*8*1*6377827*Service Fees#",
      uploadPaymentProof: "Upload your payment confirmation screenshot",
      paymentConfirmed: "Payment confirmed successfully!",
      paymentAmount: "Payment Amount",
      contactDetails: "Contact Details",
      contactInfoNote:
        "Contact details will be available after payment confirmation",
      paymentComplete: "Payment Complete",
      viewContactInfo: "View Contact Info",
      landlordName: "Landlord Name",
      landlordPhone: "Landlord Phone",
      landlordEmail: "Landlord Email",
      showContact: "Show Contact Info",
      hideContact: "Hide Contact Info",
      ussdCode: "USSD Code",
      dialNow: "Dial Now",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      invalidPhone: "Please enter a valid phone number",
      serviceFee: "Service Fee",
      totalAmount: "Total Amount",
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
      personalInfo: "Informations Personnelles",
      payment: "Paiement",
      fullName: "Nom Complet",
      idNumber: "Numéro d'Identité",
      studentId: "ID Étudiant",
      purpose: "Motif du Séjour",
      specialRequests: "Demandes Spéciales",
      paymentMethod: "Méthode de Paiement",
      momo: "MOMO",
      momoNumber: "Numéro MOMO",
      uploadScreenshot: "Télécharger la Capture de Paiement",
      chooseFile: "Choisir un Fichier",
      confirmBooking: "Confirmer la Réservation",
      submitting: "Soumission...",
      bookingSuccess: "Réservation confirmée avec succès !",
      bookingFailed: "Échec de la confirmation de la réservation",
      pleaseFillAllFields: "Veuillez remplir tous les champs requis",
      paymentInfo: "Informations de Paiement",
      momoPaymentInstructions:
        "Veuillez payer en utilisant le code USSD ci-dessous :",
      momoNumberDisplay: "0783672782",
      momoCode: "*182*8*1*6377827*Service Fees#",
      uploadPaymentProof:
        "Téléchargez votre capture de confirmation de paiement",
      paymentConfirmed: "Paiement confirmé avec succès !",
      paymentAmount: "Montant du Paiement",
      contactDetails: "Coordonnées",
      contactInfoNote:
        "Les coordonnées seront disponibles après la confirmation du paiement",
      paymentComplete: "Paiement Terminé",
      viewContactInfo: "Voir les Coordonnées",
      landlordName: "Nom du Propriétaire",
      landlordPhone: "Téléphone du Propriétaire",
      landlordEmail: "Email du Propriétaire",
      showContact: "Afficher les Coordonnées",
      hideContact: "Masquer les Coordonnées",
      ussdCode: "Code USSD",
      dialNow: "Composer Maintenant",
      required: "Ce champ est requis",
      invalidEmail: "Veuillez entrer un email valide",
      invalidPhone: "Veuillez entrer un numéro de téléphone valide",
      serviceFee: "Frais de Service",
      totalAmount: "Montant Total",
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
      personalInfo: "Amakuru yawe",
      bookingDetails: "Amakuru yo gutura",
      fullName: "Izina Ryose",
      idNumber: "Nomero y'Indangamuntu",
      studentId: "ID y'Umunyeshuri",
      purpose: "Impamvu yo Gutura",
      specialRequests: "Ibisabwa Bidasanzwe",
      paymentMethod: "Uburyo bwo Kwishyura",
      momo: "MOMO",
      momoNumber: "Nomero ya MOMO",
      uploadScreenshot: "Ongeraho Ishusho y'Ubwishyu",
      chooseFile: "Hitamo Dosive",
      confirmBooking: "Emeza Booking",
      submitting: "Biremereza...",
      bookingSuccess: "Booking yemejwe neza!",
      bookingFailed: "Kurema booking birananiranye",
      pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
      paymentInfo: "Amakuru y'Ubwishyu",
      payWithMomo: "Kwishyura ukoresheje MOMO",
      momoPaymentInstructionsLabel:
        "Kwishyura ukoresheje kode ya USSD ikurikira:",
      momoNumberDisplay: "0783672782",
      momoCode: "*182*8*1*6377827*500#",
      uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
      paymentConfirmed: "Ubwishyu bwemejwe neza!",
      paymentAmount: "Igiciro cy'Ubwishyu",
      contactDetails: "Amakuru yo Guhura",
      contactInfoNote: "Amakuru yo guhura azaboneka nyuma yo kwemeza ubwishyu",
      paymentComplete: "Ubwishyu Burangiye",
      viewContactInfo: "Reba Amakuru yo Guhura",
      landlordName: "Izina ry'Umutambyi",
      landlordPhone: "Numero y'Umutambyi",
      landlordEmail: "Imeri y'Umutambyi",
      showContact: "Reba Amakuru yo Guhura",
      hideContact: "Hisha Amakuru yo Guhura",
      ussdCode: "Kode ya USSD",
      dialNow: "Kanda Nono",
      required: "Iri soma rirakenewe",
      invalidEmail: "Injiza imeri ikwiye",
      invalidPhone: "Injiza numero ya telefoni ikwiye",
      serviceFee: "Amahera ya Serivisi",
      totalAmount: "Igiciro Cyose",
    },
  };
  return translations[lang as keyof typeof translations] || translations.en;
};

// ============================================================
// 4. HELPER FUNCTIONS
// ============================================================

const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const formatCurrency = (amount: number): string => {
  return `RWF ${amount.toLocaleString()}`;
};

const calculateServiceFee = (monthlyRent: number): number => {
  return Math.round(monthlyRent * 0.05);
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^(\+250|0)?[7-9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
};

// ============================================================
// 5. MAIN COMPONENT
// ============================================================

interface HeroProps {
  onSearch?: (params: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [language, setLanguage] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const t = getTranslations(language);

  // ===== Categories =====
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

  // ===== Search/Filter State =====
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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedHouse, setSelectedHouse] = useState<StudentHouse | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ===== Booking State =====
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [, setPaymentCompleted] = useState(false);
  const [, setShowContactInfo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState<BookingData>({
    step1: {
      fullName: "",
      email: "",
      phone: "",
      idNumber: "",
      university: "",
      studentId: "",
      purpose: "",
    },
    step2: {
      checkIn: "",
      checkOut: "",
      nights: 1,
      guests: 1,
      specialRequests: "",
    },
    step3: {
      paymentMethod: "momo",
      momoNumber: "",
      screenshot: null,
      screenshotPreview: "",
    },
  });

  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});

  const [step1Touched, setStep1Touched] = useState<Step1Touched>({
    fullName: false,
    email: false,
    phone: false,
    idNumber: false,
    university: false,
    studentId: false,
    purpose: false,
  });
  const [step2Touched, setStep2Touched] = useState<Step2Touched>({
    checkIn: false,
    checkOut: false,
    nights: false,
    guests: false,
    specialRequests: false,
  });
  const [step3Touched, setStep3Touched] = useState<Step3Touched>({
    momoNumber: false,
    screenshot: false,
  });

  // ===== Listen for language changes =====
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== language) {
        setLanguage(newLang);
      }
    };

    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // ===== Filter houses =====
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

  // ===== Save favorites =====
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ===== Body scroll lock =====
  useEffect(() => {
    if (
      isPropertyModalOpen ||
      isImageModalOpen ||
      isBookingModalOpen ||
      isLoginRequiredModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isPropertyModalOpen,
    isImageModalOpen,
    isBookingModalOpen,
    isLoginRequiredModalOpen,
  ]);

  // ===== Booking Validation Functions =====
  const validateStep1Field = (field: keyof Step1Errors, value: string) => {
    const errors: Step1Errors = { ...step1Errors };
    switch (field) {
      case "fullName":
        if (!value.trim()) errors.fullName = t.required;
        else delete errors.fullName;
        break;
      case "email":
        if (!value.trim()) errors.email = t.required;
        else if (!validateEmail(value)) errors.email = t.invalidEmail;
        else delete errors.email;
        break;
      case "phone":
        if (!value.trim()) errors.phone = t.required;
        else if (!validatePhone(value)) errors.phone = t.invalidPhone;
        else delete errors.phone;
        break;
      default:
        delete errors[field];
        break;
    }
    setStep1Errors(errors);
  };

  const validateStep2Field = (field: keyof Step2Errors, value: any) => {
    const errors: Step2Errors = { ...step2Errors };
    switch (field) {
      case "checkIn":
        if (!value) errors.checkIn = t.required;
        else delete errors.checkIn;
        break;
      case "checkOut":
        if (!value) errors.checkOut = t.required;
        else delete errors.checkOut;
        break;
      case "nights":
        if (!value || value < 1) errors.nights = t.required;
        else delete errors.nights;
        break;
      case "guests":
        if (!value || value < 1) errors.guests = t.required;
        else delete errors.guests;
        break;
      default:
        delete errors[field];
        break;
    }
    setStep2Errors(errors);
  };

  const validateStep3Field = (field: keyof Step3Errors, value: any) => {
    const errors: Step3Errors = { ...step3Errors };
    switch (field) {
      case "momoNumber":
        if (!value?.trim()) errors.momoNumber = t.required;
        else if (!validatePhone(value)) errors.momoNumber = t.invalidPhone;
        else delete errors.momoNumber;
        break;
      case "screenshot":
        if (!value) errors.screenshot = t.required;
        else delete errors.screenshot;
        break;
      default:
        break;
    }
    setStep3Errors(errors);
  };

  const isStep1Valid = (): boolean => {
    const { fullName, email, phone } = bookingData.step1;
    if (!fullName.trim()) return false;
    if (!email.trim() || !validateEmail(email)) return false;
    if (!phone.trim() || !validatePhone(phone)) return false;
    return true;
  };

  const isStep2Valid = (): boolean => {
    const { checkIn, checkOut, nights, guests } = bookingData.step2;
    if (!checkIn) return false;
    if (!checkOut) return false;
    if (nights < 1) return false;
    if (guests < 1) return false;
    return true;
  };

  const isStep3Valid = (): boolean => {
    const { momoNumber, screenshotPreview } = bookingData.step3;
    if (!momoNumber?.trim() || !validatePhone(momoNumber)) return false;
    if (!screenshotPreview) return false;
    return true;
  };

  // ===== Booking Handlers =====
  const handleStep1Change = (field: keyof BookingStep1Data, value: string) => {
    setBookingData({
      ...bookingData,
      step1: { ...bookingData.step1, [field]: value },
    });
    setStep1Touched({ ...step1Touched, [field]: true });
    validateStep1Field(field, value);
  };

  const handleStep2Change = (field: keyof BookingStep2Data, value: any) => {
    setBookingData({
      ...bookingData,
      step2: { ...bookingData.step2, [field]: value },
    });
    setStep2Touched({ ...step2Touched, [field]: true });
    validateStep2Field(field, value);
  };

  const handleStep3Change = (field: keyof BookingStep3Data, value: any) => {
    setBookingData({
      ...bookingData,
      step3: { ...bookingData.step3, [field]: value },
    });
    setStep3Touched({ ...step3Touched, [field]: true });
    if (field === "momoNumber") {
      validateStep3Field("momoNumber", value);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      setBookingData({
        ...bookingData,
        step3: {
          ...bookingData.step3,
          screenshot: file,
          screenshotPreview: preview,
        },
      });
      setStep3Touched({ ...step3Touched, screenshot: true });
      validateStep3Field("screenshot", preview);
    };
    reader.readAsDataURL(file);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const allTouched: Step1Touched = {
        fullName: true,
        email: true,
        phone: true,
        idNumber: true,
        university: true,
        studentId: true,
        purpose: true,
      };
      setStep1Touched(allTouched);

      validateStep1Field("fullName", bookingData.step1.fullName);
      validateStep1Field("email", bookingData.step1.email);
      validateStep1Field("phone", bookingData.step1.phone);

      if (!isStep1Valid()) {
        toast.warning(t.pleaseFillAllFields);
        return;
      }
    }
    if (currentStep === 2) {
      const allTouched: Step2Touched = {
        checkIn: true,
        checkOut: true,
        nights: true,
        guests: true,
        specialRequests: true,
      };
      setStep2Touched(allTouched);

      validateStep2Field("checkIn", bookingData.step2.checkIn);
      validateStep2Field("checkOut", bookingData.step2.checkOut);
      validateStep2Field("nights", bookingData.step2.nights);
      validateStep2Field("guests", bookingData.step2.guests);

      if (!isStep2Valid()) {
        toast.warning(t.pleaseFillAllFields);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitBooking = async () => {
    if (currentStep === 3) {
      const allTouched: Step3Touched = {
        momoNumber: true,
        screenshot: true,
      };
      setStep3Touched(allTouched);

      validateStep3Field("momoNumber", bookingData.step3.momoNumber);
      validateStep3Field("screenshot", bookingData.step3.screenshotPreview);

      if (!isStep3Valid()) {
        toast.warning(t.pleaseFillAllFields);
        return;
      }

      setSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const orderData = {
          houseId: selectedHouse?.id,
          houseName: selectedHouse?.name,
          priceRWF: selectedHouse?.priceRWF,
          nights: bookingData.step2.nights,
          totalPrice: (selectedHouse?.priceRWF || 0) * bookingData.step2.nights,
          serviceFee: calculateServiceFee(selectedHouse?.priceRWF || 0),
          university: selectedHouse?.university,
          district: selectedHouse?.district,
          sector: selectedHouse?.sector,
          cell: selectedHouse?.cell,
          village: selectedHouse?.village,
          checkIn: bookingData.step2.checkIn,
          checkOut: bookingData.step2.checkOut,
          guests: bookingData.step2.guests,
          ...bookingData,
          timestamp: new Date().toISOString(),
        };

        console.log("Booking Data:", orderData);
        toast.success(`✅ ${t.bookingSuccess}`);
        setPaymentCompleted(true);
        setIsBookingModalOpen(false);
        setCurrentStep(1);
        resetBookingData();
      } catch (error) {
        console.error("Booking error:", error);
        toast.error(`❌ ${t.bookingFailed}`);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const resetBookingData = () => {
    setBookingData({
      step1: {
        fullName: "",
        email: "",
        phone: "",
        idNumber: "",
        university: "",
        studentId: "",
        purpose: "",
      },
      step2: {
        checkIn: "",
        checkOut: "",
        nights: 1,
        guests: 1,
        specialRequests: "",
      },
      step3: {
        paymentMethod: "momo",
        momoNumber: "",
        screenshot: null,
        screenshotPreview: "",
      },
    });
    setStep1Errors({});
    setStep2Errors({});
    setStep3Errors({});
    setStep1Touched({
      fullName: false,
      email: false,
      phone: false,
      idNumber: false,
      university: false,
      studentId: false,
      purpose: false,
    });
    setStep2Touched({
      checkIn: false,
      checkOut: false,
      nights: false,
      guests: false,
      specialRequests: false,
    });
    setStep3Touched({
      momoNumber: false,
      screenshot: false,
    });
  };

  const openBookingModal = (house: StudentHouse) => {
    setSelectedHouse(house);
    setCurrentStep(1);
    setPaymentCompleted(false);
    setShowContactInfo(false);
    resetBookingData();
    setIsBookingModalOpen(true);
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

      toast.success(`✅ ${t.saveSuccess}`);
      console.log("Order saved successfully:", orderData);
      setIsLoginRequiredModalOpen(false);
      closeHouseModal();
    } catch (error) {
      toast.error(`❌ ${t.saveFailed}`);
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== UI Handlers =====
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
    setCurrentImageIndex(0);
    setIsPropertyModalOpen(true);
  };

  const closeHouseModal = () => {
    setIsPropertyModalOpen(false);
    setSelectedHouse(null);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
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

  // Unique values for filters
  const uniqueUniversities = [
    ...new Set(studentHousesData.map((h) => h.university)),
  ];
  const uniqueDistricts = [
    ...new Set(studentHousesData.map((h) => h.district)),
  ];
  const uniqueSectors = [...new Set(studentHousesData.map((h) => h.sector))];
  const uniqueCells = [...new Set(studentHousesData.map((h) => h.cell))];
  const uniqueVillages = [...new Set(studentHousesData.map((h) => h.village))];

  // Animation variants
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
    <div className="w-full">
      {/* ===== PROJECT HEADER ===== */}
      <div className="bg-white py-8 md:py-12 border-b border-gray-200">
        <div className="text-center mb-8">
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            {language === "rw"
              ? "GUKORA URUBUGA ABANYESHURI BA KAMINUZA BAZAJYA BAJYAHO BAKABONA AMAZU YO GUKONDESHA KUBURYO BUBOREHEYE"
              : language === "fr"
                ? "Location de maisons pour étudiants près des universités au Rwanda"
                : "Student housing rental platform near universities in Rwanda"}
          </p>
        </div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="relative z-20 -mt-6 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.where}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate">
                    <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 text-[#FF385C]" />
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
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.when}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate">
                    {getDateRange()}
                  </div>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setIsGuestModalOpen(true)}
                  className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.who}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate">
                    <PeopleAltIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 text-[#FF385C]" />
                    {getStudentCount()}
                  </div>
                </button>
              </div>

              <div className="sm:self-center flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  className="bg-[#FF385C] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF385C]/30 text-xs sm:text-sm"
                >
                  <SearchIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{t.search}</span>
                </motion.button>
                <button
                  onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                  className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <FilterListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <div className="border-t border-gray-200 mt-3 pt-3 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.university}
                      </label>
                      <select
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.district}
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.sector}
                      </label>
                      <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.cell}
                      </label>
                      <select
                        value={selectedCell}
                        onChange={(e) => setSelectedCell(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.village}
                      </label>
                      <select
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
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
                        <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-[30px]">
                          {maxMinutesFromCampus}m
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.priceRange}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          placeholder={t.minPrice}
                          className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          placeholder={t.maxPrice}
                          className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {t.sortBy}
                      </label>
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
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
                        className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <ClearIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">
                          {t.resetFilters}
                        </span>
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-6 sm:mt-8">
        <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? "border-b-2 border-[#FF385C] text-[#FF385C]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                <div
                  className={`w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white`}
                >
                  {React.cloneElement(category.icon, {
                    className: "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5",
                  })}
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ===== SEARCH INPUT ===== */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-2">
        <div className="relative max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder={t.searchProperties}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] placeholder-gray-400"
          />
        </div>
      </div>

      {/* ===== HOUSES GRID ===== */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              {filteredHouses.length} {t.popularHomes}
            </h2>
            {selectedUniversity && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {selectedUniversity}
              </p>
            )}
            {selectedDistrict && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                <LocationCityIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {selectedDistrict}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-500">
              <BookmarkIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
              {favorites.length} {t.favorites}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
                    src={house.images[0]}
                    alt={house.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(house.id);
                      }}
                      className="bg-white rounded-full p-1 sm:p-1.5 shadow-lg hover:scale-110 transition-transform"
                    >
                      {favorites.includes(house.id) ? (
                        <FavoriteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      ) : (
                        <FavoriteBorderIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs">
                    {getTranslatedType(house.type)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getUniversityColor(house.university)}`}
                    >
                      {house.university}
                    </span>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getStatusColor(house.bookingStatus)}`}
                    >
                      {getStatusText(house.bookingStatus)}
                    </span>
                  </div>
                  {house.code_vil_1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px]">
                      Code: {house.code_vil_1}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-20 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs">
                    {house.minutesFromCampus}m
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] flex items-center gap-0.5 sm:gap-1">
                    <VisibilityIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    {house.images.length}
                  </div>
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1">
                        {house.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                        <LocationOnIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5" />
                        {house.village}, {house.sector}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {house.rooms} {t.rooms}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-300">
                          •
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {house.bathrooms} {t.bathrooms}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 ml-1 sm:ml-2">
                      <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium text-gray-700">
                        <StarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                        {house.rating}
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-[#FF385C]">
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
            className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 md:mt-10"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              <ArrowBackIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">{t.prev}</span>
            </button>

            <div className="flex items-center gap-0.5 sm:gap-1">
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
                        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all ${
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
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-400 text-xs sm:text-sm"
                      >
                        …
                      </span>
                    );
                  }
                  if (page === totalPages - 1 && currentPage < totalPages - 2) {
                    return (
                      <span
                        key="ellipsis-end"
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-400 text-xs sm:text-sm"
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
              className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              <span className="hidden xs:inline">{t.next}</span>
              <ArrowForwardIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}

        {filteredHouses.length === 0 && (
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-gray-500 text-sm sm:text-base">{t.noResults}</p>
          </div>
        )}
      </div>

      {/* ============================================================
          PROPERTY DETAIL MODAL - WITH IMAGE SLIDER/CAROUSEL
          ============================================================ */}
      <AnimatePresence>
        {isPropertyModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
              onClick={closeHouseModal}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[301] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Image Slider / Carousel */}
                <div className="relative">
                  <div className="relative h-56 sm:h-40 md:h-50 lg:h-60 overflow-hidden bg-gray-900">
                    <img
                      src={selectedHouse.images[currentImageIndex]}
                      alt={`${selectedHouse.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />

                    {/* Image counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                      {currentImageIndex + 1} / {selectedHouse.images.length}
                    </div>

                    {/* Navigation Arrows */}
                    {selectedHouse.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            setCurrentImageIndex((prev) =>
                              prev === 0
                                ? selectedHouse.images.length - 1
                                : prev - 1,
                            );
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all hover:scale-110"
                        >
                          <ArrowBackIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentImageIndex((prev) =>
                              prev === selectedHouse.images.length - 1
                                ? 0
                                : prev + 1,
                            );
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all hover:scale-110"
                        >
                          <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </>
                    )}

                    {/* Thumbnail indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedHouse.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* View Full Screen Button */}
                  <button
                    onClick={() => openImageModal(currentImageIndex)}
                    className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1 transition-colors"
                  >
                    <VisibilityIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Full Screen</span>
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-3 flex flex-wrap gap-1">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${getUniversityColor(selectedHouse.university)}`}
                    >
                      <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
                      <span className="hidden xs:inline">
                        {selectedHouse.university}
                      </span>
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${getStatusColor(selectedHouse.bookingStatus)}`}
                    >
                      {getStatusText(selectedHouse.bookingStatus)}
                    </span>
                  </div>

                  {/* Close and Favorite buttons */}
                  <button
                    onClick={closeHouseModal}
                    className="absolute top-3 right-3 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedHouse.id)}
                    className="absolute top-3 right-12 sm:right-14 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    {favorites.includes(selectedHouse.id) ? (
                      <FavoriteIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                    ) : (
                      <FavoriteBorderIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    )}
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-280px)] sm:max-h-[calc(90vh-300px)]">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        {selectedHouse.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                        <LocationOnIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                        {getLocationInfo(selectedHouse)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                        {selectedHouse.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-base sm:text-lg font-medium text-gray-700 flex-shrink-0">
                      <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      {selectedHouse.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
                      <AccessTimeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                      {selectedHouse.minutesFromCampus}m
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-medium">
                      <CalendarTodayIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                      {selectedHouse.yearBuilt}
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-[10px] sm:text-xs font-medium">
                      <AttachMoneyIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                      {selectedHouse.priceRWF.toLocaleString()} RWF
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-50 text-orange-700 rounded-full text-[10px] sm:text-xs font-medium">
                      {getTranslatedType(selectedHouse.type)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.province}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {selectedHouse.province}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.district}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {selectedHouse.district}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.sector}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {selectedHouse.sector}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.cell}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {selectedHouse.cell}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.village}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {selectedHouse.village}
                      </p>
                      {selectedHouse.code_vil_1 && (
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                          Code: {selectedHouse.code_vil_1}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.rooms}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        <BedIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                        {selectedHouse.rooms}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {t.bathrooms}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        <BathroomIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                        {selectedHouse.bathrooms}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1.5 sm:mb-2">
                      <InfoIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 text-[#FF385C]" />
                      {t.features}
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedHouse.features?.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1.5 sm:mb-2">
                      {t.amenities}
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedHouse.amenities?.map((amenity) => {
                        let icon = (
                          <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                        );
                        if (amenity === "WiFi")
                          icon = (
                            <WifiIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          );
                        if (amenity === "Kitchen" || amenity === "Kitchenette")
                          icon = (
                            <KitchenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                          );
                        if (amenity === "Parking")
                          icon = (
                            <LocalParkingIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          );
                        if (amenity === "Security")
                          icon = (
                            <SecurityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          );
                        return (
                          <span
                            key={amenity}
                            className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs text-gray-700"
                          >
                            {icon}
                            {amenity}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.price} ({t.priceInRWF})
                        </p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">
                          {selectedHouse.priceRWF.toLocaleString()} RWF
                          <span className="text-xs sm:text-sm font-normal text-gray-500">
                            {" "}
                            {t.perNight}
                          </span>
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                          ${selectedHouse.price} USD • {selectedHouse.nights}{" "}
                          {t.nightsTotal}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.serviceFee}:{" "}
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.priceRWF),
                          )}
                        </p>
                      </div>
                      {selectedHouse.bookingStatus === "available" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            closeHouseModal();
                            openBookingModal(selectedHouse);
                          }}
                          className="w-full sm:w-auto bg-[#FF385C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                        >
                          <LoginIcon className="w-3 h-3 sm:w-4 sm:h-4" />
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
          FULL SCREEN IMAGE MODAL
          ============================================================ */}
      <AnimatePresence>
        {isImageModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[400]"
              onClick={closeImageModal}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[401] flex items-center justify-center p-2 sm:p-4"
            >
              <div className="relative max-w-5xl max-h-[90vh] w-full">
                <button
                  onClick={closeImageModal}
                  className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedHouse.images[currentImageIndex]}
                    alt={selectedHouse.name}
                    className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />

                  {selectedHouse.images.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) =>
                            prev === 0
                              ? selectedHouse.images.length - 1
                              : prev - 1,
                          );
                        }}
                        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                      >
                        <ArrowBackIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) =>
                            prev === selectedHouse.images.length - 1
                              ? 0
                              : prev + 1,
                          );
                        }}
                        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                      >
                        <ArrowForwardIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-[10px] sm:text-sm">
                    <span className="font-medium">{selectedHouse.name}</span>
                    <span className="text-gray-400 hidden xs:inline">|</span>
                    <span className="text-gray-300 hidden xs:inline">
                      {selectedHouse.village}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-300">
                      {currentImageIndex + 1} / {selectedHouse.images.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          BOOKING MODAL
          ============================================================ */}
      <AnimatePresence>
        {isBookingModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                if (!submitting) {
                  setIsBookingModalOpen(false);
                  setCurrentStep(1);
                  resetBookingData();
                }
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[101] flex items-center justify-center"
            >
              <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 rounded-t-xl sm:rounded-t-2xl z-10">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900">
                      {t.bookThisHouse || "Book This House"}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (!submitting) {
                        setIsBookingModalOpen(false);
                        setCurrentStep(1);
                        resetBookingData();
                      }
                    }}
                    className="p-0.5 sm:p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                    disabled={submitting}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-6"
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
                  </motion.button>
                </div>

                {/* Progress Steps */}
                <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full text-[10px] sm:text-xs md:text-sm font-medium ${
                            currentStep >= step
                              ? "bg-[#FF385C] text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="ml-0.5 sm:ml-1 md:ml-2 text-[8px] sm:text-[10px] md:text-sm font-medium text-gray-600 hidden xs:inline">
                          {step === 1 && t.personalInfo}
                          {step === 2 && t.bookingDetails}
                          {step === 3 && t.payment}
                        </span>
                        {step < 3 && (
                          <div
                            className={`w-4 sm:w-6 md:w-12 h-0.5 mx-0.5 sm:mx-1 md:mx-2 ${currentStep > step ? "bg-[#FF385C]" : "bg-gray-200"}`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.fullName || "Full Name"} *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={bookingData.step1.fullName}
                              onChange={(e) =>
                                handleStep1Change("fullName", e.target.value)
                              }
                              onBlur={() => {
                                setStep1Touched({
                                  ...step1Touched,
                                  fullName: true,
                                });
                                validateStep1Field(
                                  "fullName",
                                  bookingData.step1.fullName,
                                );
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step1Touched.fullName && step1Errors.fullName
                                  ? "border-red-500 bg-red-50"
                                  : step1Touched.fullName &&
                                      bookingData.step1.fullName.trim() !== ""
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                              placeholder="John Doe"
                            />
                            {step1Touched.fullName && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step1Errors.fullName ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step1.fullName.trim() !== "" ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step1Touched.fullName && step1Errors.fullName && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step1Errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.email || "Email"} *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={bookingData.step1.email}
                              onChange={(e) =>
                                handleStep1Change("email", e.target.value)
                              }
                              onBlur={() => {
                                setStep1Touched({
                                  ...step1Touched,
                                  email: true,
                                });
                                validateStep1Field(
                                  "email",
                                  bookingData.step1.email,
                                );
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step1Touched.email && step1Errors.email
                                  ? "border-red-500 bg-red-50"
                                  : step1Touched.email &&
                                      validateEmail(bookingData.step1.email)
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                              placeholder="john@example.com"
                            />
                            {step1Touched.email && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step1Errors.email ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : validateEmail(bookingData.step1.email) ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step1Touched.email && step1Errors.email && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step1Errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.phone || "Phone"} *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bookingData.step1.phone}
                              onChange={(e) =>
                                handleStep1Change("phone", e.target.value)
                              }
                              onBlur={() => {
                                setStep1Touched({
                                  ...step1Touched,
                                  phone: true,
                                });
                                validateStep1Field(
                                  "phone",
                                  bookingData.step1.phone,
                                );
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step1Touched.phone && step1Errors.phone
                                  ? "border-red-500 bg-red-50"
                                  : step1Touched.phone &&
                                      validatePhone(bookingData.step1.phone)
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                              placeholder="+250788123456"
                            />
                            {step1Touched.phone && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step1Errors.phone ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : validatePhone(bookingData.step1.phone) ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step1Touched.phone && step1Errors.phone && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step1Errors.phone}
                            </p>
                          )}
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.idNumber || "ID Number"}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.idNumber}
                            onChange={(e) =>
                              handleStep1Change("idNumber", e.target.value)
                            }
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder="ID123456"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.university || "University"}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.university}
                            onChange={(e) =>
                              handleStep1Change("university", e.target.value)
                            }
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder={t.university || "University"}
                          />
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.studentId || "Student ID"}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.studentId}
                            onChange={(e) =>
                              handleStep1Change("studentId", e.target.value)
                            }
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder="STU12345"
                          />
                        </div>
                      </div>

                      <div className="mb-2 sm:mb-3 md:mb-4">
                        <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.purpose || "Purpose of Stay"}
                        </label>
                        <textarea
                          value={bookingData.step1.purpose}
                          onChange={(e) =>
                            handleStep1Change("purpose", e.target.value)
                          }
                          rows={2}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                          placeholder="Study, internship, research..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Booking Details */}
                  {currentStep === 2 && (
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.checkIn || "Check-in Date"} *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={bookingData.step2.checkIn}
                              onChange={(e) =>
                                handleStep2Change("checkIn", e.target.value)
                              }
                              onBlur={() => {
                                setStep2Touched({
                                  ...step2Touched,
                                  checkIn: true,
                                });
                                validateStep2Field(
                                  "checkIn",
                                  bookingData.step2.checkIn,
                                );
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step2Touched.checkIn && step2Errors.checkIn
                                  ? "border-red-500 bg-red-50"
                                  : step2Touched.checkIn &&
                                      bookingData.step2.checkIn
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                            />
                            {step2Touched.checkIn && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step2Errors.checkIn ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step2.checkIn ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step2Touched.checkIn && step2Errors.checkIn && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step2Errors.checkIn}
                            </p>
                          )}
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.checkOut || "Check-out Date"} *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={bookingData.step2.checkOut}
                              onChange={(e) => {
                                const checkOut = e.target.value;
                                const nights =
                                  bookingData.step2.checkIn && checkOut
                                    ? Math.ceil(
                                        (new Date(checkOut).getTime() -
                                          new Date(
                                            bookingData.step2.checkIn,
                                          ).getTime()) /
                                          (1000 * 60 * 60 * 24),
                                      )
                                    : 1;
                                setBookingData({
                                  ...bookingData,
                                  step2: {
                                    ...bookingData.step2,
                                    checkOut,
                                    nights: nights > 0 ? nights : 1,
                                  },
                                });
                                setStep2Touched({
                                  ...step2Touched,
                                  checkOut: true,
                                  nights: true,
                                });
                                validateStep2Field("checkOut", checkOut);
                                validateStep2Field("nights", nights);
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step2Touched.checkOut && step2Errors.checkOut
                                  ? "border-red-500 bg-red-50"
                                  : step2Touched.checkOut &&
                                      bookingData.step2.checkOut
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                            />
                            {step2Touched.checkOut && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step2Errors.checkOut ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step2.checkOut ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step2Touched.checkOut && step2Errors.checkOut && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step2Errors.checkOut}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.nights || "Nights"} *
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={bookingData.step2.nights}
                              onChange={(e) =>
                                handleStep2Change(
                                  "nights",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              onBlur={() => {
                                setStep2Touched({
                                  ...step2Touched,
                                  nights: true,
                                });
                                validateStep2Field(
                                  "nights",
                                  bookingData.step2.nights,
                                );
                              }}
                              min="1"
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step2Touched.nights && step2Errors.nights
                                  ? "border-red-500 bg-red-50"
                                  : step2Touched.nights &&
                                      bookingData.step2.nights > 0
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                            />
                            {step2Touched.nights && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step2Errors.nights ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step2.nights > 0 ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step2Touched.nights && step2Errors.nights && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step2Errors.nights}
                            </p>
                          )}
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.guests || "Guests"} *
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={bookingData.step2.guests}
                              onChange={(e) =>
                                handleStep2Change(
                                  "guests",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              onBlur={() => {
                                setStep2Touched({
                                  ...step2Touched,
                                  guests: true,
                                });
                                validateStep2Field(
                                  "guests",
                                  bookingData.step2.guests,
                                );
                              }}
                              min="1"
                              max={10}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step2Touched.guests && step2Errors.guests
                                  ? "border-red-500 bg-red-50"
                                  : step2Touched.guests &&
                                      bookingData.step2.guests > 0
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                            />
                            {step2Touched.guests && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step2Errors.guests ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step2.guests > 0 ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step2Touched.guests && step2Errors.guests && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                              {step2Errors.guests}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-2 sm:mb-3 md:mb-4">
                        <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.specialRequests || "Special Requests"}
                        </label>
                        <textarea
                          value={bookingData.step2.specialRequests}
                          onChange={(e) =>
                            handleStep2Change("specialRequests", e.target.value)
                          }
                          rows={2}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                          placeholder="Any special requests..."
                        />
                      </div>

                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4">
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Total Nights:</span>{" "}
                          {bookingData.step2.nights}
                        </p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Total Price:</span>{" "}
                          {formatCurrency(
                            bookingData.step2.nights * selectedHouse.priceRWF,
                          )}
                        </p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                          <span className="font-medium">{t.serviceFee}:</span>{" "}
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.priceRWF),
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          {t.paymentMethod || "Payment Method"} *
                        </label>
                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                          <div className="p-2 sm:p-3 md:p-4 border-2 rounded-lg text-center transition-all bg-[#FF385C]/5 border-[#FF385C]">
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto text-[#FF385C] mb-0.5 sm:mb-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                            </svg>
                            <p className="text-xs sm:text-sm md:text-base font-medium">
                              {t.momo || "MOMO"}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                              {t.payWithMomo || "Pay with MOMO"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.momoNumber || "MOMO Number"} *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bookingData.step3.momoNumber || ""}
                              onChange={(e) =>
                                handleStep3Change("momoNumber", e.target.value)
                              }
                              onBlur={() => {
                                setStep3Touched({
                                  ...step3Touched,
                                  momoNumber: true,
                                });
                                validateStep3Field(
                                  "momoNumber",
                                  bookingData.step3.momoNumber,
                                );
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step3Touched.momoNumber &&
                                step3Errors.momoNumber
                                  ? "border-red-500 bg-red-50"
                                  : step3Touched.momoNumber &&
                                      bookingData.step3.momoNumber &&
                                      validatePhone(
                                        bookingData.step3.momoNumber,
                                      )
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                              placeholder="0788123456"
                            />
                            {step3Touched.momoNumber && (
                              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                {step3Errors.momoNumber ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
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
                                ) : bookingData.step3.momoNumber &&
                                  validatePhone(
                                    bookingData.step3.momoNumber,
                                  ) ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step3Touched.momoNumber &&
                            step3Errors.momoNumber && (
                              <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                                {step3Errors.momoNumber}
                              </p>
                            )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3 md:p-4">
                          <p className="text-[10px] sm:text-xs md:text-sm font-medium text-yellow-800">
                            {t.paymentInfo || "Payment Information"}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-yellow-700 mt-0.5 sm:mt-1">
                            {t.momoPaymentInstructions ||
                              "Please pay using the USSD code below:"}
                          </p>
                          <div className="mt-1 sm:mt-2 p-1.5 sm:p-2 md:p-3 bg-white rounded border border-yellow-200">
                            <div className="text-center">
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1">
                                {t.paymentAmount || "Payment Amount"}
                              </p>
                              <p className="font-bold text-[#FF385C] text-sm sm:text-base md:text-lg">
                                {formatCurrency(
                                  calculateServiceFee(selectedHouse.priceRWF),
                                )}
                              </p>
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1 mt-1 sm:mt-2">
                                {t.ussdCode || "USSD Code"}
                              </p>
                              <p className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#FF385C]">
                                {t.momoCode || "*182*8*1*6377827*500#"}
                              </p>
                              <a
                                href={`tel:${(t.momoCode || "*182*8*1*6377827*500#").replace(/\*/g, "%2A").replace(/#/g, "%23")}`}
                                className="inline-block mt-1 sm:mt-2 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-[#FF385C] text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:bg-[#E31C5F] transition-colors"
                              >
                                📞 {t.dialNow || "Dial Now"}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="mb-2 sm:mb-3 md:mb-4">
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.uploadPaymentProof ||
                              "Upload Payment Screenshot"}{" "}
                            *
                          </label>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="payment-screenshot"
                            />
                            <label
                              htmlFor="payment-screenshot"
                              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-[10px] sm:text-xs md:text-sm flex items-center gap-0.5 sm:gap-1 md:gap-2 ${
                                step3Touched.screenshot &&
                                step3Errors.screenshot
                                  ? "border-red-500 bg-red-50"
                                  : step3Touched.screenshot &&
                                      bookingData.step3.screenshotPreview
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                              }`}
                            >
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {t.chooseFile || "Choose File"}
                            </label>
                            {bookingData.step3.screenshotPreview && (
                              <div className="relative">
                                <img
                                  src={bookingData.step3.screenshotPreview}
                                  alt="Payment Screenshot"
                                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                  onClick={() => {
                                    setBookingData({
                                      ...bookingData,
                                      step3: {
                                        ...bookingData.step3,
                                        screenshot: null,
                                        screenshotPreview: "",
                                      },
                                    });
                                    setStep3Touched({
                                      ...step3Touched,
                                      screenshot: true,
                                    });
                                    validateStep3Field("screenshot", "");
                                  }}
                                  className="absolute -top-1 sm:-top-1.5 md:-top-2 -right-1 sm:-right-1.5 md:-right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                  <svg
                                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
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
                            )}
                            {step3Touched.screenshot && (
                              <div>
                                {step3Errors.screenshot ? (
                                  <svg
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-500"
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
                                ) : bookingData.step3.screenshotPreview ? (
                                  <svg
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-500"
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
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step3Touched.screenshot &&
                            step3Errors.screenshot && (
                              <p className="text-[10px] sm:text-xs text-red-500 mt-0.5">
                                {step3Errors.screenshot}
                              </p>
                            )}
                          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                            {t.uploadPaymentProof ||
                              "Upload your payment confirmation screenshot"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4">
                        <div className="flex justify-between items-center mt-0.5 sm:mt-1">
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                            {t.serviceFee || "Service Fee"}
                          </span>
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                            {formatCurrency(
                              calculateServiceFee(selectedHouse.priceRWF),
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                    {currentStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={prevStep}
                        disabled={submitting}
                        className="px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-[10px] sm:text-xs md:text-sm"
                      >
                        {t.previous || "Previous"}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={
                        currentStep === 3 ? handleSubmitBooking : nextStep
                      }
                      disabled={
                        submitting ||
                        (currentStep === 1 && !isStep1Valid()) ||
                        (currentStep === 2 && !isStep2Valid()) ||
                        (currentStep === 3 && !isStep3Valid())
                      }
                      className={`flex-1 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm ${
                        submitting ||
                        (currentStep === 1 && !isStep1Valid()) ||
                        (currentStep === 2 && !isStep2Valid()) ||
                        (currentStep === 3 && !isStep3Valid())
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.submitting || "Submitting..."}
                        </>
                      ) : currentStep === 3 ? (
                        <>
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
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
                          {t.confirmBooking || "Confirm Booking"}
                        </>
                      ) : (
                        t.next || "Next"
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          LOGIN REQUIRED MODAL
          ============================================================ */}
      <AnimatePresence>
        {isLoginRequiredModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[350]"
              onClick={() => setIsLoginRequiredModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[351] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    {t.loginRequired}
                  </h3>
                  <button
                    onClick={() => setIsLoginRequiredModalOpen(false)}
                    className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <LoginIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF385C]" />
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {t.loginRequired}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t.loginToOrder}
                    </p>
                    <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        <strong>{selectedHouse.name}</strong> •{" "}
                        {selectedHouse.priceRWF.toLocaleString()} RWF/month
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveOrder}
                      disabled={isSaving}
                      className="w-full py-2 sm:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                      className="w-full py-1.5 sm:py-2.5 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
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
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsLocationModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    {t.selectLocation}
                  </h3>
                  <button
                    onClick={() => setIsLocationModalOpen(false)}
                    className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <div className="relative mb-3 sm:mb-4">
                    <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder={t.searchDestinations}
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                      autoFocus
                    />
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-2">
                      <SchoolIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {t.popularLocations}
                    </h4>
                    <div className="max-h-32 sm:max-h-40 overflow-y-auto space-y-0.5 sm:space-y-1 border rounded-lg p-1">
                      {uniqueUniversities.map((uni) => (
                        <button
                          key={uni}
                          onClick={() => {
                            setSelectedUniversity(uni);
                            setSearchLocation(uni);
                            setSelectedDistrict("");
                            setIsLocationModalOpen(false);
                          }}
                          className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                        >
                          <SchoolIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF385C]" />
                          <span>{uni}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-2">
                      <LocationCityIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {t.districtLabel || "Districts"}
                    </h4>
                    <div className="max-h-32 sm:max-h-40 overflow-y-auto space-y-0.5 sm:space-y-1 border rounded-lg p-1">
                      {uniqueDistricts.map((district) => (
                        <button
                          key={district}
                          onClick={() => {
                            setSelectedDistrict(district);
                            setSearchLocation(district);
                            setSelectedUniversity("");
                            setIsLocationModalOpen(false);
                          }}
                          className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                        >
                          <LocationCityIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF385C]" />
                          <span>{district}</span>
                        </button>
                      ))}
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
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsDatePickerOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    {t.when}
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={clearDates}
                      className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {t.clear}
                    </button>
                    <button
                      onClick={() => setIsDatePickerOpen(false)}
                      className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ArrowBackIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <h4 className="text-sm sm:text-base font-semibold">
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long", year: "numeric" },
                      )}
                    </h4>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-[10px] sm:text-xs font-medium text-gray-500 py-0.5 sm:py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                    {renderCalendar()}
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between border-t border-gray-200 pt-3 sm:pt-4 gap-1 sm:gap-2">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tempCheckIn && (
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          {t.checkIn}: {tempCheckIn.toLocaleDateString()}
                        </span>
                      )}
                      {tempCheckOut && (
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          {t.checkOut}: {tempCheckOut.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={applyDates}
                      disabled={!tempCheckIn || !tempCheckOut}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
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
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsGuestModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    <PeopleAltIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2 text-[#FF385C]" />
                    {t.guests}
                  </h3>
                  <button
                    onClick={() => setIsGuestModalOpen(false)}
                    className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <PeopleAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <span className="text-sm sm:text-base font-medium">
                        {t.students || "Students"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() =>
                          setStudentCount(Math.max(1, studentCount - 1))
                        }
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <RemoveIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="w-5 sm:w-6 text-center font-medium text-sm sm:text-base">
                        {studentCount}
                      </span>
                      <button
                        onClick={() => setStudentCount(studentCount + 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <AddIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsGuestModalOpen(false);
                      toast.success(`👥 ${getStudentCount()}`);
                    }}
                    className="w-full py-2 sm:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-sm sm:text-base"
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
