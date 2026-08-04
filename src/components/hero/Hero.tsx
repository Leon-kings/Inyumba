/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BathroomIcon from "@mui/icons-material/Bathroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SecurityIcon from "@mui/icons-material/Security";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InfoIcon from "@mui/icons-material/Info";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DomainIcon from "@mui/icons-material/Domain";

// ============================================================
// API CONFIGURATION
// ============================================================

const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================
// LOCATION DATA - All 30 Districts of Rwanda
// ============================================================

const ALL_DISTRICTS = [
  "Nyarugenge",
  "Gasabo",
  "Kicukiro",
  "Nyanza",
  "Gisagara",
  "Nyaruguru",
  "Huye",
  "Muhanga",
  "Kamonyi",
  "Ruhango",
  "Karongi",
  "Rutsiro",
  "Nyabihu",
  "Rubavu",
  "Rusizi",
  "Nyamasheke",
  "Ngororero",
  "Musanze",
  "Burera",
  "Gakenke",
  "Rulindo",
  "Gicumbi",
  "Bugesera",
  "Gatsibo",
  "Kayonza",
  "Kirehe",
  "Ngoma",
  "Nyagatare",
  "Rwamagana",
];

const ALL_SECTORS: Record<string, string[]> = {
  Nyarugenge: [
    "Gitega",
    "Nyamirambo",
    "Kiyovu",
    "Rwezamenyo",
    "Kamukina",
    "Muhima",
    "Kanyinya",
    "Gisozi",
    "Nyarugenge",
    "Kimisagara",
    "Mageragere",
    "Niboye",
    "Kigali",
  ],
  Gasabo: [
    "Remera",
    "Kacyiru",
    "Kimihurura",
    "Kagarama",
    "Ndera",
    "Rusororo",
    "Gatsata",
    "Jali",
    "Kimironko",
    "Gisozi",
    "Kinyinya",
    "Kibagabaga",
    "Bumbogo",
    "Nyarutarama",
    "Kigali",
  ],
  Kicukiro: [
    "Kicukiro",
    "Kanombe",
    "Gahanga",
    "Masaka",
    "Kigarama",
    "Niboye",
    "Gatenga",
    "Kanserege",
    "Rwimbogo",
    "Gikondo",
  ],
  Nyanza: ["Nyanza", "Busasamana", "Kibilizi", "Nyagisozi", "Rwabicuma"],
  Gisagara: ["Gisagara", "Kibilizi", "Muganza", "Nyanza", "Save", "Zaza"],
  Nyaruguru: ["Nyaruguru", "Muyaga", "Kibeho", "Munini", "Ruramba", "Mukura"],
  Huye: [
    "Ngoma",
    "Huye",
    "Kimironko",
    "Kibirizi",
    "Ruhashya",
    "Taba",
    "Mbazi",
    "Mukura",
    "Rwaniro",
  ],
  Muhanga: [
    "Kabgayi",
    "Muhanga",
    "Cyeza",
    "Rongi",
    "Shyogwe",
    "Nyarusange",
    "Kibangu",
    "Kirehe",
  ],
  Kamonyi: ["Kamonyi", "Runda", "Karama", "Nyarubaka", "Rugende", "Muyira"],
  Ruhango: ["Ruhango", "Byimana", "Kinazi", "Mamba", "Mugombwa", "Gitwe"],
  Karongi: [
    "Bwishyura",
    "Gishyita",
    "Gitesi",
    "Mubuga",
    "Mushubati",
    "Rubengera",
    "Rwankuba",
    "Ruganda",
  ],
  Rutsiro: [
    "Rutsiro",
    "Kigeyo",
    "Murunda",
    "Musasa",
    "Ngoma",
    "Ngororero",
    "Ruhango",
  ],
  Nyabihu: ["Nyabihu", "Jenda", "Mukamira", "Rurembo", "Kora"],
  Rubavu: [
    "Rubavu",
    "Bugeshi",
    "Gisenyi",
    "Kanama",
    "Kanyanzira",
    "Nyundo",
    "Rugerero",
  ],
  Rusizi: [
    "Kamembe",
    "Bugarama",
    "Butare",
    "Gihundwe",
    "Kigembe",
    "Mururu",
    "Nkanka",
  ],
  Nyamasheke: [
    "Nyamasheke",
    "Bushekeri",
    "Kibogora",
    "Rangiro",
    "Shangi",
    "Kagano",
    "Gitambi",
  ],
  Ngororero: ["Ngororero", "Muhanda", "Mushonyi", "Ngororero", "Tare"],
  Musanze: [
    "Muhoza",
    "Busogo",
    "Cyuve",
    "Gacaca",
    "Gashaki",
    "Gataraga",
    "Kimonyi",
    "Muko",
    "Musanze",
    "Nkotsi",
    "Nyange",
    "Remera",
    "Rwaza",
    "Shyira",
  ],
  Burera: [
    "Burera",
    "Bungwe",
    "Butaro",
    "Cyanika",
    "Gahunga",
    "Gatebe",
    "Gitega",
    "Kinyababa",
    "Kivuye",
    "Mubago",
  ],
  Gakenke: [
    "Gakenke",
    "Busengo",
    "Coko",
    "Gakenke",
    "Gasiza",
    "Janja",
    "Kamubuga",
    "Karambo",
    "Kivuruga",
    "Mudende",
    "Nemba",
    "Rulindo",
    "Rushashi",
  ],
  Rulindo: [
    "Rulindo",
    "Base",
    "Bushoki",
    "Butaro",
    "Cyingoma",
    "Kibenga",
    "Kigoma",
    "Kinigi",
    "Muyumbu",
    "Ruhondo",
    "Tumba",
    "Kinzuzi",
  ],
  Gicumbi: [
    "Gicumbi",
    "Bukamba",
    "Giti",
    "Kaniga",
    "Manyagiro",
    "Miyove",
    "Mukarange",
    "Muko",
    "Murambi",
    "Remera",
    "Rwamiko",
    "Rwimi",
  ],
  Bugesera: [
    "Nyamata",
    "Gashora",
    "Juru",
    "Kamabuye",
    "Mareba",
    "Mayange",
    "Musenyi",
    "Ntarama",
    "Ruhuha",
    "Rwimbogo",
    "Shyara",
  ],
  Gatsibo: [
    "Gatsibo",
    "Gasange",
    "Gatsibo",
    "Kabare",
    "Kagarama",
    "Mukarange",
    "Murambi",
    "Nyagihanga",
    "Remera",
    "Rugarama",
    "Rukomo",
  ],
  Kayonza: [
    "Kayonza",
    "Gahini",
    "Kabare",
    "Kabarondo",
    "Mukarange",
    "Murama",
    "Murundi",
    "Mwiri",
    "Ndego",
    "Nyamirambo",
    "Rwinkwavu",
    "Rwinkwavu",
  ],
  Kirehe: [
    "Kirehe",
    "Gahara",
    "Kirehe",
    "Mahama",
    "Mpanga",
    "Musaza",
    "Mushikiri",
    "Nasho",
    "Nyamugari",
    "Rukoma",
  ],
  Ngoma: [
    "Remera",
    "Gashanda",
    "Jarama",
    "Karembo",
    "Kazo",
    "Kibungo",
    "Mugesera",
    "Murama",
    "Mutenderi",
    "Rwimbogo",
  ],
  Nyagatare: [
    "Nyagatare",
    "Gatsibo",
    "Kagitumba",
    "Karama",
    "Katsindo",
    "Matimba",
    "Mimuri",
    "Mukama",
    "Musheri",
    "Rwamagana",
    "Rwimi",
  ],
  Rwamagana: [
    "Rwamagana",
    "Fumbwe",
    "Gahengeri",
    "Gishari",
    "Karenge",
    "Muhazi",
    "Murugandu",
    "Mushikiri",
    "Muyumbu",
    "Nkoto",
    "Nyarubuye",
    "Rubona",
  ],
};

const ALL_CELLS: Record<string, string[]> = {
  Gitega: [
    "Akabahizi",
    "Akamahoro",
    "Akamatamu",
    "Akamurenge",
    "Akanduga",
    "Akanyoni",
    "Akarambo",
    "Akarusimbi",
  ],
  Nyamirambo: [
    "Ampima",
    "Biryogo",
    "Kankurimba",
    "Kiyovu",
    "Muganza",
    "Nyamirambo",
    "Rwezamenyo",
  ],
  Remera: [
    "Amahoro",
    "Kibagabaga",
    "Kinyinya",
    "Remera",
    "Rugando",
    "Rwambogo",
  ],
  Kacyiru: ["Kacyiru", "Kagugu", "Kamukina", "Karama", "Kimihurura"],
  Kimihurura: ["Kimihurura", "Kimihurura Center", "Kimihurura West"],
  Kicukiro: ["Kicukiro", "Kicukiro Center", "Kicukiro East", "Kicukiro South"],
  Kanombe: [
    "Kanombe",
    "Kanombe Airport",
    "Kanombe Military",
    "Kanombe Village",
  ],
  Ngoma: ["Ngoma", "Ngoma Center", "Ngoma East", "Ngoma South", "Ngoma West"],
  Huye: ["Huye", "Huye Center", "Huye East", "Huye North", "Huye South"],
  Kabgayi: ["Kabgayi", "Kabgayi Cathedral", "Kabgayi Center"],
  Muhanga: ["Muhanga", "Muhanga Center", "Muhanga East"],
  Ruhango: ["Ruhango", "Ruhango Center", "Ruhango South"],
  Bwishyura: [
    "Bwishyura",
    "Bwishyura Center",
    "Bwishyura North",
    "Bwishyura South",
  ],
  Kamembe: ["Kamembe", "Kamembe Center", "Kamembe East", "Kamembe West"],
  Rubavu: ["Rubavu", "Rubavu Center", "Rubavu North", "Rubavu South"],
  Muhoza: [
    "Muhoza",
    "Cyabararika",
    "Muhoza Center",
    "Muhoza East",
    "Muhoza West",
  ],
  Musanze: [
    "Musanze",
    "Musanze Center",
    "Musanze East",
    "Musanze North",
    "Musanze South",
  ],
  Rulindo: ["Rulindo", "Rulindo Center", "Rulindo East", "Rulindo South"],
  Nyamata: [
    "Nyamata",
    "Nyamata Center",
    "Nyamata East",
    "Nyamata South",
    "Nyamata West",
  ],
  Kayonza: ["Kayonza", "Kayonza Center", "Kayonza East", "Kayonza North"],
  Rwamagana: [
    "Rwamagana",
    "Rwamagana Center",
    "Rwamagana East",
    "Rwamagana South",
    "Rwamagana West",
  ],
  Nyagatare: [
    "Nyagatare",
    "Nyagatare Center",
    "Nyagatare East",
    "Nyagatare North",
    "Nyagatare South",
  ],
  Kibungo: ["Kibungo", "Kibungo Center", "Kibungo East", "Kibungo South"],
  Gikondo: ["Gikondo", "Gikondo Industrial", "Gikondo Residential"],
  Gahanga: ["Gahanga", "Gahanga Center", "Gahanga East"],
  Masaka: ["Masaka", "Masaka Center", "Masaka South"],
  Niboye: ["Niboye", "Niboye Center", "Niboye East"],
  Rusororo: ["Rusororo", "Rusororo Center", "Rusororo East", "Rusororo West"],
  Ndera: ["Ndera", "Ndera Center", "Ndera East", "Ndera South"],
  Jali: ["Jali", "Jali Center", "Jali North", "Jali South"],
  Kimironko: ["Kimironko", "Kimironko Center", "Kimironko East"],
  Kibagabaga: ["Kibagabaga", "Kibagabaga Center", "Kibagabaga East"],
  Bumbogo: ["Bumbogo", "Bumbogo Center", "Bumbogo North"],
  Gatsata: ["Gatsata", "Gatsata Center", "Gatsata East"],
  Kinyinya: ["Kinyinya", "Kinyinya Center", "Kinyinya South"],
  Nyarutarama: [
    "Nyarutarama",
    "Nyarutarama Center",
    "Nyarutarama East",
    "Nyarutarama West",
  ],
  Rwimbogo: ["Rwimbogo", "Rwimbogo Center", "Rwimbogo East", "Rwimbogo South"],
  Kigarama: ["Kigarama", "Kigarama Center", "Kigarama East"],
  Gatenga: ["Gatenga", "Gatenga Center", "Gatenga South"],
  Kanserege: ["Kanserege", "Kanserege Center", "Kanserege East"],
  Rugando: ["Rugando", "Rugando Center", "Rugando East"],
  Rwambogo: ["Rwambogo", "Rwambogo Center", "Rwambogo South"],
};

const ALL_VILLAGES: Record<string, string[]> = {
  Akabahizi: [
    "Gihanga",
    "Iterambere",
    "Izuba",
    "Sunrise",
    "Peaceful",
    "Green Valley",
    "Kigali Heights",
    "Ruhango",
    "Muhanga",
    "Nyabugogo",
    "Kicukiro",
    "Kimihurura",
    "Remera",
    "Kacyiru",
    "Gikondo",
    "Kanombe",
    "Nyarutarama",
  ],
  Nyamirambo: ["Nyamirambo", "Biryogo", "Kankurimba", "Kiyovu", "Muganza"],
  Amahoro: [
    "Kigali Heights",
    "Remera",
    "Nyarutarama",
    "Amahoro Village",
    "Amahoro Estate",
  ],
  Kacyiru: ["Kacyiru", "Kacyiru South", "Nyarutarama", "Kacyiru Village"],
  Kimihurura: ["Kimihurura", "Kimihurura Heights", "Kimihurura Estate"],
  Kicukiro: ["Kicukiro", "Kicukiro Heights", "Kicukiro Village"],
  Kanombe: ["Kanombe", "Kanombe Airport", "Kanombe Military"],
  Muhoza: ["Cyabararika", "Muhoza", "Muhoza Heights", "Musanze", "Ruhengeri"],
  Musanze: ["Musanze", "Musanze Heights", "Musanze North", "Musanze South"],
  Ngoma: ["Ngoma", "Huye", "Huye Heights"],
  Huye: ["Huye", "Huye Heights", "Huye Village"],
  Kabgayi: ["Kabgayi", "Kabgayi Cathedral", "Kabgayi Heights"],
  Muhanga: ["Muhanga", "Muhanga Heights"],
  Ruhango: ["Ruhango", "Ruhango Heights", "Gitwe"],
  Bwishyura: ["Bwishyura", "Bwishyura Heights", "Karongi"],
  Kamembe: ["Kamembe", "Kamembe Heights", "Rusizi"],
  Rubavu: ["Rubavu", "Rubavu Heights", "Gisenyi"],
  Rulindo: ["Rulindo", "Rulindo Heights", "Tumba"],
  Nyamata: ["Nyamata", "Nyamata Heights", "Nyamata Village"],
  Kayonza: ["Kayonza", "Kayonza Heights", "Kayonza Village"],
  Rwamagana: ["Rwamagana", "Rwamagana Heights", "Rwamagana Village"],
  Nyagatare: ["Nyagatare", "Nyagatare Heights", "Nyagatare Village"],
  Kibungo: ["Kibungo", "Kibungo Heights", "Kibungo Village"],
  Gikondo: ["Gikondo", "Gikondo Industrial", "Gikondo Village"],
  Gahanga: ["Gahanga", "Gahanga Village"],
  Masaka: ["Masaka", "Masaka Village"],
  Niboye: ["Niboye", "Niboye Village"],
  Rusororo: ["Rusororo", "Rusororo Village"],
  Ndera: ["Ndera", "Ndera Village"],
  Jali: ["Jali", "Jali Village"],
  Kimironko: ["Kimironko", "Kimironko Village"],
  Kibagabaga: ["Kibagabaga", "Kibagabaga Village"],
  Bumbogo: ["Bumbogo", "Bumbogo Village"],
  Gatsata: ["Gatsata", "Gatsata Village"],
  Kinyinya: ["Kinyinya", "Kinyinya Village"],
  Nyarutarama: ["Nyarutarama", "Nyarutarama Village"],
  Rwimbogo: ["Rwimbogo", "Rwimbogo Village"],
  Kigarama: ["Kigarama", "Kigarama Village"],
  Gatenga: ["Gatenga", "Gatenga Village"],
  Kanserege: ["Kanserege", "Kanserege Village"],
  Rugando: ["Rugando", "Rugando Village"],
  Rwambogo: ["Rwambogo", "Rwambogo Village"],
};

// ============================================================
// STUDENT HOUSES DATA (Sample - Full data in original)
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

// Sample student houses (full data in original)
const studentHousesData: StudentHouse[] = [
  {
    id: 1,
    name: "Gihanga Student Lodge",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 1,
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
    ],
    description: "Modern student house in Gihanga, near UR-CST campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
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
    nights: 1,
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
    nights: 1,
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
    ],
    description: "Large student house with garden, near UR-CST.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area"],
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    ],
    description: "Luxury student housing in Kigali Heights, close to campus.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Garden",
      "Security",
      "Parking",
      "Study Room",
    ],
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    ],
    description: "Spacious lodge in Remera with all amenities.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Garden",
      "Security",
      "Parking",
      "Study Room",
    ],
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    nights: 1,
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
    ],
    description: "Premium student lodge in Nyarutarama area.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Garden",
      "Security",
      "Parking",
      "Study Room",
      "Laundry",
    ],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: [
      "Solar Panels",
      "Water Heater",
      "Study Desk",
      "Garden",
      "BBQ Area",
    ],
    yearBuilt: 2023,
  },
  // ===== INES-Ruhengeri =====
  {
    id: 18,
    name: "INES Ruhengeri Student Lodge",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 1,
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
    nights: 1,
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
    ],
    description: "Student village in Musanze, close to INES campus.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Security",
      "Parking",
      "Study Area",
      "Laundry",
    ],
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
    nights: 1,
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
  // ===== University of Kigali (UoK) =====
  {
    id: 21,
    name: "Kigali Heights Student Residence",
    type: "Apartment",
    price: 90,
    priceRWF: 117000,
    nights: 1,
    rating: 4.8,
    category: "student",
    university: "University of Kigali (UoK)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Remera",
    cell: "Amahoro",
    village: "Kigali Heights",
    code_vil_1: "11020101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Luxury apartments near UoK campus with modern amenities.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Gym", "Pool"],
    owner: "Mugisha Peter",
    contact: "+250 788456789",
    bookingStatus: "available",
    minutesFromCampus: 3,
    features: ["Balcony", "Water Heater", "Study Desk"],
    yearBuilt: 2023,
  },
  {
    id: 22,
    name: "Remera Student Village",
    type: "House",
    price: 80,
    priceRWF: 104000,
    nights: 1,
    rating: 4.6,
    category: "student",
    university: "University of Kigali (UoK)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Remera",
    cell: "Amahoro",
    village: "Remera",
    code_vil_1: "11020102",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Spacious student village in Remera, close to UoK.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Garden"],
    owner: "Niyonshuti Jean",
    contact: "+250 788567890",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
  },
  // ===== Kigali Independent University (ULK) =====
  {
    id: 23,
    name: "Kicukiro ULK Student House",
    type: "House",
    price: 75,
    priceRWF: 97500,
    nights: 1,
    rating: 4.5,
    category: "student",
    university: "Kigali Independent Univ. (ULK)",
    province: "Kigali City",
    district: "Kicukiro",
    sector: "Kicukiro",
    cell: "Kicukiro",
    village: "Kicukiro",
    code_vil_1: "11030101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Affordable student house near ULK campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Uwimana Grace",
    contact: "+250 788678901",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
  },
  {
    id: 24,
    name: "Kicukiro Student Apartments",
    type: "Apartment",
    price: 68,
    priceRWF: 88400,
    nights: 1,
    rating: 4.4,
    category: "student",
    university: "Kigali Independent Univ. (ULK)",
    province: "Kigali City",
    district: "Kicukiro",
    sector: "Kicukiro",
    cell: "Kicukiro",
    village: "Kicukiro Heights",
    code_vil_1: "11030102",
    rooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Comfortable apartments near ULK, ideal for students.",
    amenities: ["WiFi", "Kitchen", "Security"],
    owner: "Mukeshimana Marie",
    contact: "+250 788789012",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Water Heater"],
    yearBuilt: 2020,
  },
  // ===== Carnegie Mellon University Africa =====
  {
    id: 25,
    name: "CMU-Africa Student Lodge",
    type: "Apartment",
    price: 95,
    priceRWF: 123500,
    nights: 1,
    rating: 4.9,
    category: "student",
    university: "Carnegie Mellon (CMU-Africa)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kacyiru",
    village: "Kacyiru",
    code_vil_1: "11040101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Premium student housing near CMU-Africa campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room", "Gym"],
    owner: "Kagame Peter",
    contact: "+250 788890123",
    bookingStatus: "available",
    minutesFromCampus: 2,
    features: ["Solar Panels", "Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2023,
  },
  // ===== African Leadership University =====
  {
    id: 26,
    name: "ALU Kigali Student Residence",
    type: "Apartment",
    price: 88,
    priceRWF: 114400,
    nights: 1,
    rating: 4.7,
    category: "student",
    university: "African Leadership Univ. (ALU)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kacyiru",
    village: "Kacyiru South",
    code_vil_1: "11040102",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near ALU with collaborative spaces.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Garden"],
    owner: "Rwema Emmanuel",
    contact: "+250 788901234",
    bookingStatus: "available",
    minutesFromCampus: 4,
    features: ["Garden", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
  },
  // ===== Adventist University of Central Africa =====
  {
    id: 27,
    name: "AUCA Student Village",
    type: "House",
    price: 72,
    priceRWF: 93600,
    nights: 1,
    rating: 4.5,
    category: "student",
    university: "Adventist Univ. (AUCA)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kacyiru",
    village: "Kacyiru",
    code_vil_1: "11040103",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Peaceful student village near AUCA campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Garden", "Study Area"],
    owner: "Habimana Jean",
    contact: "+250 788012345",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
  },
  // ===== IPRC Kigali =====
  {
    id: 28,
    name: "IPRC Kigali Student Hostel",
    type: "Hostel",
    price: 55,
    priceRWF: 71500,
    nights: 1,
    rating: 4.3,
    category: "student",
    university: "IPRC Kigali",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Remera",
    cell: "Kibagabaga",
    village: "Kibagabaga",
    code_vil_1: "11050101",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Kigali students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area", "Common Room"],
    owner: "Niyonzima Anne",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Common Room", "Study Desk"],
    yearBuilt: 2020,
  },
  // ===== Mount Kigali University =====
  {
    id: 29,
    name: "Mount Kigali Student Residence",
    type: "Apartment",
    price: 78,
    priceRWF: 101400,
    nights: 1,
    rating: 4.6,
    category: "student",
    university: "Mount Kigali University",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kimihurura",
    cell: "Kimihurura",
    village: "Kimihurura",
    code_vil_1: "11060101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near Mount Kigali University.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Muhire Emmanuel",
    contact: "+250 788234567",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
  },
  // ===== UR - Huye Campus =====
  {
    id: 30,
    name: "Huye Student Village",
    type: "House",
    price: 65,
    priceRWF: 84500,
    nights: 1,
    rating: 4.4,
    category: "student",
    university: "UR - Huye Campus",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Ngoma",
    village: "Huye",
    code_vil_1: "53010101",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village in Huye, near UR campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788345678",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
  },
  // ===== IPRC Huye =====
  {
    id: 31,
    name: "IPRC Huye Student Hostel",
    type: "Hostel",
    price: 50,
    priceRWF: 65000,
    nights: 1,
    rating: 4.2,
    category: "student",
    university: "IPRC Huye",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Ngoma",
    village: "Huye",
    code_vil_1: "53010102",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for IPRC Huye students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Uwera Sarah",
    contact: "+250 788456789",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  // ===== Catholic Institute of Kabgayi (ICK) =====
  {
    id: 32,
    name: "Kabgayi Student Residence",
    type: "House",
    price: 60,
    priceRWF: 78000,
    nights: 1,
    rating: 4.3,
    category: "student",
    university: "Catholic Institute (ICK)",
    province: "Southern",
    district: "Muhanga",
    sector: "Kabgayi",
    cell: "Kabgayi",
    village: "Kabgayi",
    code_vil_1: "53020101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Peaceful residence near ICK Kabgayi.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Habineza James",
    contact: "+250 788567890",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
  },
  // ===== University of Gitwe =====
  {
    id: 33,
    name: "Gitwe Student Village",
    type: "House",
    price: 55,
    priceRWF: 71500,
    nights: 1,
    rating: 4.2,
    category: "student",
    university: "University of Gitwe",
    province: "Southern",
    district: "Ruhango",
    sector: "Gitwe",
    cell: "Gitwe",
    village: "Gitwe",
    code_vil_1: "53030101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near University of Gitwe.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Rukundo Jean",
    contact: "+250 788678901",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Study Desk"],
    yearBuilt: 2020,
  },
  // ===== Catholic University of Rwanda =====
  {
    id: 34,
    name: "Catholic University Student Lodge",
    type: "Apartment",
    price: 68,
    priceRWF: 88400,
    nights: 1,
    rating: 4.4,
    category: "student",
    university: "Catholic University of Rwanda",
    province: "Southern",
    district: "Nyanza",
    sector: "Nyanza",
    cell: "Nyanza",
    village: "Nyanza",
    code_vil_1: "53040101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near Catholic University.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking"],
    owner: "Mugisha David",
    contact: "+250 788789012",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
  },
  // ===== IPRC Musanze =====
  {
    id: 35,
    name: "IPRC Musanze Student Hostel",
    type: "Hostel",
    price: 48,
    priceRWF: 62400,
    nights: 1,
    rating: 4.1,
    category: "student",
    university: "IPRC Musanze",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Muhoza",
    village: "Muhoza",
    code_vil_1: "43030201",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Musanze students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Niyomugabo Eric",
    contact: "+250 788890123",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  // ===== IPRC Ngoma =====
  {
    id: 36,
    name: "Ngoma Student Village",
    type: "House",
    price: 50,
    priceRWF: 65000,
    nights: 1,
    rating: 4.0,
    category: "student",
    university: "IPRC Ngoma",
    province: "Eastern",
    district: "Ngoma",
    sector: "Remera",
    cell: "Remera",
    village: "Ngoma",
    code_vil_1: "21010101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near IPRC Ngoma.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Ishimwe Grace",
    contact: "+250 788901234",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2020,
  },
  // ===== IPRC Karongi =====
  {
    id: 37,
    name: "Karongi Student Residence",
    type: "House",
    price: 45,
    priceRWF: 58500,
    nights: 1,
    rating: 4.0,
    category: "student",
    university: "IPRC Karongi",
    province: "Western",
    district: "Karongi",
    sector: "Bwishyura",
    cell: "Bwishyura",
    village: "Karongi",
    code_vil_1: "32010101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Peaceful residence near IPRC Karongi.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Mukeshimana Marie",
    contact: "+250 788012345",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  // ===== IPRC Rusizi =====
  {
    id: 38,
    name: "Rusizi Student Hostel",
    type: "Hostel",
    price: 40,
    priceRWF: 52000,
    nights: 1,
    rating: 3.9,
    category: "student",
    university: "IPRC Rusizi",
    province: "Western",
    district: "Rusizi",
    sector: "Kamembe",
    cell: "Kamembe",
    village: "Rusizi",
    code_vil_1: "32020101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for IPRC Rusizi students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Study Desk"],
    yearBuilt: 2018,
  },
  // ===== UR - Nyagatare Campus =====
  {
    id: 39,
    name: "Nyagatare Student Village",
    type: "House",
    price: 48,
    priceRWF: 62400,
    nights: 1,
    rating: 4.0,
    category: "student",
    university: "UR - Nyagatare Campus",
    province: "Eastern",
    district: "Nyagatare",
    sector: "Nyagatare",
    cell: "Nyagatare",
    village: "Nyagatare",
    code_vil_1: "21020101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student village near UR Nyagatare Campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Rutayisire John",
    contact: "+250 788234567",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
  },
  // ===== UR - CAVM (Agriculture) =====
  {
    id: 40,
    name: "CAVM Student Residence",
    type: "House",
    price: 55,
    priceRWF: 71500,
    nights: 1,
    rating: 4.2,
    category: "student",
    university: "UR - CAVM (Agriculture)",
    province: "Eastern",
    district: "Kayonza",
    sector: "Kayonza",
    cell: "Kayonza",
    village: "Kayonza",
    code_vil_1: "21030101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Residence near CAVM, ideal for agriculture students.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Uwimana Jeanne",
    contact: "+250 788345678",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
  },
  // ===== IPRC Tumba =====
  {
    id: 41,
    name: "Tumba Student Hostel",
    type: "Hostel",
    price: 42,
    priceRWF: 54600,
    nights: 1,
    rating: 3.8,
    category: "student",
    university: "IPRC Tumba",
    province: "Northern",
    district: "Rulindo",
    sector: "Tumba",
    cell: "Tumba",
    village: "Tumba",
    code_vil_1: "43040101",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Tumba students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788456789",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  // ===== Univ. of Global Health Equity =====
  {
    id: 42,
    name: "Global Health Student Residence",
    type: "Apartment",
    price: 80,
    priceRWF: 104000,
    nights: 1,
    rating: 4.7,
    category: "student",
    university: "Univ. of Global Health Equity",
    province: "Eastern",
    district: "Bugesera",
    sector: "Nyamata",
    cell: "Nyamata",
    village: "Nyamata",
    code_vil_1: "21040101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near UGHE campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Garden"],
    owner: "Kagame Peter",
    contact: "+250 788567890",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2023,
  },
  // ===== Kibogora Polytechnic =====
  {
    id: 43,
    name: "Kibogora Student Village",
    type: "House",
    price: 45,
    priceRWF: 58500,
    nights: 1,
    rating: 3.9,
    category: "student",
    university: "Kibogora Polytechnic",
    province: "Western",
    district: "Nyamasheke",
    sector: "Kibogora",
    cell: "Kibogora",
    village: "Kibogora",
    code_vil_1: "32030101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near Kibogora Polytechnic.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Mukamana Alice",
    contact: "+250 788678901",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2020,
  },
  // ===== Univ. of Tech & Arts (UTAB) =====
  {
    id: 44,
    name: "UTAB Student Residence",
    type: "Apartment",
    price: 58,
    priceRWF: 75400,
    nights: 1,
    rating: 4.1,
    category: "student",
    university: "Univ. of Tech & Arts (UTAB)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kimironko",
    cell: "Kimironko",
    village: "Kimironko",
    code_vil_1: "11070101",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near UTAB campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Habimana Jean",
    contact: "+250 788789012",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
  },
  // ===== UTB (Tourism & Business) =====
  {
    id: 45,
    name: "UTB Student Hostel",
    type: "Hostel",
    price: 48,
    priceRWF: 62400,
    nights: 1,
    rating: 4.0,
    category: "student",
    university: "UTB (Tourism & Business)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kacyiru",
    village: "Kacyiru",
    code_vil_1: "11070102",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student hostel near UTB, ideal for business students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Niyonshuti Jean",
    contact: "+250 788890123",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Study Desk"],
    yearBuilt: 2020,
  },
  // ===== RICA (Conservation Agric.) =====
  {
    id: 46,
    name: "RICA Student Village",
    type: "House",
    price: 50,
    priceRWF: 65000,
    nights: 1,
    rating: 4.0,
    category: "student",
    university: "RICA (Conservation Agric.)",
    province: "Eastern",
    district: "Kayonza",
    sector: "Rwinkwavu",
    cell: "Rwinkwavu",
    village: "Rwinkwavu",
    code_vil_1: "21030201",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student village near RICA campus.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Rukundo Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
  },
  // ===== ILPD (Law Institute) =====
  {
    id: 47,
    name: "ILPD Student Residence",
    type: "Apartment",
    price: 72,
    priceRWF: 93600,
    nights: 1,
    rating: 4.5,
    category: "student",
    university: "ILPD (Law Institute)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kimihurura",
    cell: "Kimihurura",
    village: "Kimihurura",
    code_vil_1: "11070201",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near ILPD, ideal for law students.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Parking"],
    owner: "Mugisha David",
    contact: "+250 788012345",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2022,
  },
  // ===== Rwanda Military Academy =====
  {
    id: 48,
    name: "RMA Student Hostel",
    type: "Hostel",
    price: 42,
    priceRWF: 54600,
    nights: 1,
    rating: 3.8,
    category: "student",
    university: "Rwanda Military Academy",
    province: "Eastern",
    district: "Bugesera",
    sector: "Gashora",
    cell: "Gashora",
    village: "Gashora",
    code_vil_1: "21040201",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student hostel near Rwanda Military Academy.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
  },
  // ===== JKUAT - Rwanda Campus =====
  {
    id: 49,
    name: "JKUAT Student Lodge",
    type: "Apartment",
    price: 68,
    priceRWF: 88400,
    nights: 1,
    rating: 4.3,
    category: "student",
    university: "JKUAT - Rwanda Campus",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kacyiru",
    village: "Kacyiru",
    code_vil_1: "11070301",
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near JKUAT Rwanda Campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room"],
    owner: "Rwema Emmanuel",
    contact: "+250 788234567",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
  },
  // ===== UR - CE (Education) =====
  {
    id: 50,
    name: "CE Student Village",
    type: "House",
    price: 52,
    priceRWF: 67600,
    nights: 1,
    rating: 4.1,
    category: "student",
    university: "UR - CE (Education)",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Ngoma",
    village: "Huye",
    code_vil_1: "53010103",
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near UR College of Education.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Habineza James",
    contact: "+250 788567890",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2021,
  },
];
// ============================================================
// TRANSLATIONS
// ============================================================

const getTranslations = (lang: string) => {
  const translations: Record<string, any> = {
    en: {
      popularHomes: "Student Houses Available",
      room: "Room",
      apartment: "Apartment",
      months: "months",
      where: "Location",
      searchDestinations: "Search universities or locations in Rwanda",
      search: "Search",
      favorites: "Saved",
      removeFavorite: "Remove from saved",
      addFavorite: "Add to saved",
      searchProperties: "Search houses...",
      noResults: "No houses found matching your criteria.",
      price: "Price",
      perMonth: "/ month",
      amenities: "Amenities",
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
      orderNow: "Order Now",
      login: "Log in",
      signup: "Sign up",
      selectLocation: "Select Location",
      guests: "Students",
      apply: "Apply",
      clear: "Clear",
      prev: "Previous",
      next: "Next",
      resetFilters: "Reset Filters",
      selectSector: "Select Sector",
      selectCell: "Select Cell",
      selectVillage: "Select Village",
      sectorLabel: "Sector",
      cellLabel2: "Cell",
      villageLabel2: "Village",
      searchByUniversity: "Search by University",
      allDistricts: "All Districts",
      allSectors: "All Sectors",
      allCells: "All Cells",
      allVillages: "All Villages",
      selectDistrict: "Select District",
      clickToSelect: "Click to select",
      monthlyRent: "Monthly Rent",
      serviceFee: "Service Fee",
      totalAmount: "Total Amount to Pay",
      paymentInfo: "Payment Information",
      momoPaymentInstructions: "Please pay using the USSD code below:",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof: "Upload your payment confirmation screenshot",
      chooseFile: "Choose File",
      confirmBooking: "Confirm Booking",
      submitting: "Submitting...",
      bookingSuccess: "Booking confirmed successfully!",
      bookingFailed: "Failed to confirm booking",
      pleaseFillAllFields: "Please fill in all required fields",
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
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      invalidPhone: "Please enter a valid phone number",
      email: "Email",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginSuccess: "Login successful!",
      loginFailed: "Login failed. Please try again.",
      registerSuccess: "Registration successful!",
      registerFailed: "Registration failed. Please try again.",
      welcomeBack: "Welcome back",
      accountCreated: "Account created! Welcome",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      tryAgain: "Try Again",
      done: "Done",
      previous: "Previous",
      bookThisHouse: "Book This House",
      propertyType: "Property Type",
      location: "in",
      from: "from",
      perMonthShort: "/month",
      loginRequired: "Login Required",
      loginToOrder: "Please login to order this house",
      loginNow: "Login",
      registerNow: "Register",
      or: "or",
      houseDetails: "House Details",
      priceInRWF: "Price in RWF",
      code: "Village Code",
      priceCategories: "Price Categories",
      categoryLow: "Low (0 - 80,000 RWF)",
      categoryMedium: "Medium (80,001 - 130,000 RWF)",
      categoryHigh: "High (130,001+ RWF)",
      allHouses: "All Houses",
      students: "Students",
      dialNow: "Dial Now",
      ussdCode: "USSD Code",
      paymentComplete: "Payment Complete",
      viewOnDashboard: "View on Dashboard",
      paymentApproval: "Payment Approval",
      paymentPending:
        "Your payment is being processed. You'll be notified once approved.",
      viewDashboard: "Go to Dashboard",
      landlordInfo: "Landlord Information",
      landlordName: "Landlord Name",
      landlordPhone: "Landlord Phone",
      landlordEmail: "Landlord Email",
      paymentAmount: "Payment Amount",
      successTitle: "Payment Submitted Successfully!",
      successMessage:
        "Your payment has been recorded. Our team will verify it and you'll be notified.",
      bookingDetails: "Booking Details",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      payWithMomo: "Pay with MOMO",
      passwordWeak: "Weak",
      passwordModerate: "Moderate",
      passwordStrong: "Strong",
    },
    fr: {
      popularHomes: "Maisons étudiantes disponibles",
      room: "Chambre",
      apartment: "Appartement",
      months: "mois",
      where: "Emplacement",
      searchDestinations: "Rechercher des universités ou lieux au Rwanda",
      search: "Rechercher",
      favorites: "Favoris",
      removeFavorite: "Retirer des favoris",
      addFavorite: "Ajouter aux favoris",
      searchProperties: "Rechercher des maisons...",
      noResults: "Aucune maison trouvée correspondant à vos critères.",
      price: "Prix",
      perMonth: "/ mois",
      amenities: "Équipements",
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
      orderNow: "Commander maintenant",
      login: "Se connecter",
      signup: "S'inscrire",
      selectLocation: "Choisir un emplacement",
      guests: "Étudiants",
      apply: "Appliquer",
      clear: "Effacer",
      prev: "Précédent",
      next: "Suivant",
      resetFilters: "Réinitialiser les filtres",
      selectSector: "Sélectionner le Secteur",
      selectCell: "Sélectionner la Cellule",
      selectVillage: "Sélectionner le Village",
      sectorLabel: "Secteur",
      cellLabel2: "Cellule",
      villageLabel2: "Village",
      searchByUniversity: "Rechercher par Université",
      allDistricts: "Tous les Districts",
      allSectors: "Tous les Secteurs",
      allCells: "Toutes les Cellules",
      allVillages: "Tous les Villages",
      selectDistrict: "Sélectionner le District",
      clickToSelect: "Cliquer pour sélectionner",
      monthlyRent: "Loyer Mensuel",
      serviceFee: "Frais de Service",
      totalAmount: "Montant Total à Payer",
      paymentInfo: "Informations de Paiement",
      momoPaymentInstructions:
        "Veuillez payer en utilisant le code USSD ci-dessous :",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof:
        "Téléchargez votre capture de confirmation de paiement",
      chooseFile: "Choisir un Fichier",
      confirmBooking: "Confirmer la Réservation",
      submitting: "Soumission...",
      bookingSuccess: "Réservation confirmée avec succès !",
      bookingFailed: "Échec de la confirmation de la réservation",
      pleaseFillAllFields: "Veuillez remplir tous les champs requis",
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
      required: "Ce champ est requis",
      invalidEmail: "Veuillez entrer un email valide",
      invalidPhone: "Veuillez entrer un numéro de téléphone valide",
      email: "E-mail",
      phoneNumber: "Téléphone",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      loginSuccess: "Connexion réussie !",
      loginFailed: "Échec de la connexion. Veuillez réessayer.",
      registerSuccess: "Inscription réussie !",
      registerFailed: "Échec de l'inscription. Veuillez réessayer.",
      welcomeBack: "Bon retour",
      accountCreated: "Compte créé ! Bienvenue",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      tryAgain: "Réessayer",
      done: "Terminé",
      previous: "Précédent",
      bookThisHouse: "Réserver Cette Maison",
      propertyType: "Type de propriété",
      location: "à",
      from: "à partir de",
      perMonthShort: "/mois",
      loginRequired: "Connexion requise",
      loginToOrder: "Veuillez vous connecter pour commander cette maison",
      loginNow: "Se connecter",
      registerNow: "S'inscrire",
      or: "ou",
      houseDetails: "Détails de la maison",
      priceInRWF: "Prix en RWF",
      code: "Code du village",
      priceCategories: "Catégories de Prix",
      categoryLow: "Bas (0 - 80,000 RWF)",
      categoryMedium: "Moyen (80,001 - 130,000 RWF)",
      categoryHigh: "Élevé (130,001+ RWF)",
      allHouses: "Toutes les Maisons",
      students: "Étudiants",
      dialNow: "Composer Maintenant",
      ussdCode: "Code USSD",
      paymentComplete: "Paiement Terminé",
      viewOnDashboard: "Voir sur le Tableau de Bord",
      paymentApproval: "Approbation du Paiement",
      paymentPending:
        "Votre paiement est en cours de traitement. Vous serez notifié une fois approuvé.",
      viewDashboard: "Aller au Tableau de Bord",
      landlordInfo: "Informations du Propriétaire",
      landlordName: "Nom du Propriétaire",
      landlordPhone: "Téléphone du Propriétaire",
      landlordEmail: "Email du Propriétaire",
      paymentAmount: "Montant du Paiement",
      successTitle: "Paiement Soumis avec Succès !",
      successMessage:
        "Votre paiement a été enregistré. Notre équipe le vérifiera et vous serez notifié.",
      bookingDetails: "Détails de la Réservation",
      checkIn: "Date d'arrivée",
      checkOut: "Date de départ",
      payWithMomo: "Payer avec MOMO",
      passwordWeak: "Faible",
      passwordModerate: "Modéré",
      passwordStrong: "Fort",
    },
    rw: {
      popularHomes: "Amazu y'abanyeshuri ariboneka",
      room: "Icyumba",
      apartment: "Aparitama",
      months: "amezi",
      where: "Aho gihe",
      searchDestinations: "Shakisha kaminuza cyangwa aho gihe mu Rwanda",
      search: "Shakisha",
      favorites: "Ibyakiriwe",
      removeFavorite: "Kuraho kubyakiriwe",
      addFavorite: "Ongeraho kubyakiriwe",
      searchProperties: "Shakisha amazu...",
      noResults: "Nta mazu yabonetse.",
      price: "Igiciro",
      perMonth: "/ ukwezi",
      amenities: "Ibikoresho",
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
      orderNow: "Tegura Nono",
      login: "Kwinjira",
      signup: "Kwiyandikisha",
      selectLocation: "Hitamo aho gihe",
      guests: "Abanyeshuri",
      apply: "Kora",
      clear: "Kuraho",
      prev: "Ibibanziriza",
      next: "Ibikurikira",
      resetFilters: "Kuraho iyo myunyu",
      selectSector: "Hitamo Umurenge",
      selectCell: "Hitamo Akagari",
      selectVillage: "Hitamo Umudugudu",
      sectorLabel: "Umurenge",
      cellLabel2: "Akagari",
      villageLabel2: "Umudugudu",
      searchByUniversity: "Shakisha ukurikije Kaminuza",
      allDistricts: "Uturere Twose",
      allSectors: "Imirenge Yose",
      allCells: "Utugari Twose",
      allVillages: "Imidugudu Yose",
      selectDistrict: "Hitamo Akarere",
      clickToSelect: "Kanda kugirango uhitemo",
      monthlyRent: "Igiciro cy'Ukwezi",
      serviceFee: "Amahera ya Serivisi",
      totalAmount: "Igiciro Cyose",
      paymentInfo: "Amakuru y'Ubwishyu",
      momoPaymentInstructions: "Kwishyura ukoresheje kode ya USSD ikurikira:",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
      chooseFile: "Hitamo Dosive",
      confirmBooking: "Emeza Booking",
      submitting: "Biremereza...",
      bookingSuccess: "Booking yemejwe neza!",
      bookingFailed: "Kurema booking birananiranye",
      pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
      personalInfo: "Amakuru yawe",
      payment: "Ubwishyu",
      fullName: "Izina Ryose",
      idNumber: "Nomero y'Indangamuntu",
      studentId: "ID y'Umunyeshuri",
      purpose: "Impamvu yo Gutura",
      specialRequests: "Ibisabwa Bidasanzwe",
      paymentMethod: "Uburyo bwo Kwishyura",
      momo: "MOMO",
      momoNumber: "Nomero ya MOMO",
      uploadScreenshot: "Ongeraho Ishusho y'Ubwishyu",
      required: "Iri soma rirakenewe",
      invalidEmail: "Injiza imeri ikwiye",
      invalidPhone: "Injiza numero ya telefoni ikwiye",
      email: "Imeli",
      phoneNumber: "Telefone",
      password: "Ijambo ryibanga",
      confirmPassword: "Emeza ijambo ryibanga",
      loginSuccess: "Kwinjira byakunze!",
      loginFailed: "Kwinjira byananiranye. Ongera ugerageze.",
      registerSuccess: "Kwiyandikisha byakunze!",
      registerFailed: "Kwiyandikisha byananiranye. Ongera ugerageze.",
      welcomeBack: "Murakaza neza",
      accountCreated: "Konti yashizweho! Murakaza neza",
      alreadyHaveAccount: "Ufite konti?",
      dontHaveAccount: "Nta konti ufite?",
      tryAgain: "Ongera ugerageze",
      done: "Byakozwe",
      previous: "Ibibanziriza",
      bookThisHouse: "Tegura Iyi Nzu",
      propertyType: "Ubwoko bw'azu",
      location: "i",
      from: "kuva",
      perMonthShort: "/ukwezi",
      loginRequired: "Kwinjira birakenewe",
      loginToOrder: "Nyamuneka winjire mbere yo gutegura iyi nzu",
      loginNow: "Kwinjira",
      registerNow: "Iyandikisha",
      or: "cyangwa",
      houseDetails: "Ibisobanuro by'azu",
      priceInRWF: "Igiciro mu Rwanda",
      code: "Kode y'umudugudu",
      priceCategories: "Ibikorwa by'Igiciro",
      categoryLow: "Hasi (0 - 80,000 RWF)",
      categoryMedium: "Hagati (80,001 - 130,000 RWF)",
      categoryHigh: "Hejuru (130,001+ RWF)",
      allHouses: "Amazu Yose",
      students: "Abanyeshuri",
      dialNow: "Kanda Nono",
      ussdCode: "Kode ya USSD",
      paymentComplete: "Ubwishyu Burangiye",
      viewOnDashboard: "Reba kuri Dashboard",
      paymentApproval: "Kwemeza Ubwishyu",
      paymentPending:
        "Ubwishyu bwawe burimo gutunganywa. Uzamenyeshwa iyo bwemejwe.",
      viewDashboard: "Jya kuri Dashboard",
      landlordInfo: "Amakuru y'Umutambyi",
      landlordName: "Izina ry'Umutambyi",
      landlordPhone: "Numero y'Umutambyi",
      landlordEmail: "Imeri y'Umutambyi",
      paymentAmount: "Igiciro cy'Ubwishyu",
      successTitle: "Ubwishyu Bwoherejwe Neza!",
      successMessage:
        "Ubwishyu bwawe bwabonetse. Itsinda ryacu rizaribona kandi uzamenyeshwa.",
      bookingDetails: "Amakuru ya Booking",
      checkIn: "Itariki yo Kwinjira",
      checkOut: "Itariki yo Gusohoka",
      payWithMomo: "Kwishyura na MOMO",
      passwordWeak: "Icyatsi",
      passwordModerate: "Hagati",
      passwordStrong: "Gikomeye",
    },
  };
  return translations[lang as keyof typeof translations] || translations.en;
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const formatCurrency = (amount: number): string => {
  return `RWF ${amount.toLocaleString()}`;
};

// Service Fee - 5% of monthly rent
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
// PRICE CATEGORIES
// ============================================================

type PriceCategory = "all" | "low" | "medium" | "high";

interface PriceCategoryOption {
  id: PriceCategory;
  label: string;
  range: string;
  icon: React.ReactNode;
  color: string;
  min: number;
  max: number;
}

const getPriceCategories = (t: any): PriceCategoryOption[] => {
  return [
    {
      id: "all",
      label: t.allHouses || "All Houses",
      range: "All",
      icon: <HomeIcon />,
      color: "from-gray-400 to-gray-500",
      min: 0,
      max: Infinity,
    },
    {
      id: "low",
      label: t.categoryLow || "Low (0 - 80,000 RWF)",
      range: "0 - 80,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-green-400 to-emerald-500",
      min: 0,
      max: 80000,
    },
    {
      id: "medium",
      label: t.categoryMedium || "Medium (80,001 - 130,000 RWF)",
      range: "80,001 - 130,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-yellow-400 to-amber-500",
      min: 80001,
      max: 130000,
    },
    {
      id: "high",
      label: t.categoryHigh || "High (130,001+ RWF)",
      range: "130,001+ RWF",
      icon: <AttachMoneyIcon />,
      color: "from-red-400 to-rose-500",
      min: 130001,
      max: Infinity,
    },
  ];
};

// ============================================================
// LOGIN REGISTER MODAL WITH FULL VALIDATION
// ============================================================

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultMode?: "login" | "register";
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  // Validation states
  const [isLoginEmailValid, setIsLoginEmailValid] = useState<boolean | null>(
    null,
  );
  const [isLoginPasswordValid, setIsLoginPasswordValid] = useState<
    boolean | null
  >(null);
  const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<
    boolean | null
  >(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<
    boolean | null
  >(null);

  const t = getTranslations(getLanguageFromCookies());

  // ---- Login Field Handlers with Validation ----
  const handleLoginEmailChange = (email: string) => {
    setLoginEmail(email);
    setIsLoginEmailValid(email.length > 0 ? validateEmail(email) : null);
    setLoginError("");
    setErrorMessage("");
  };

  const handleLoginPasswordChange = (password: string) => {
    setLoginPassword(password);
    setIsLoginPasswordValid(password.length >= 6);
    setLoginError("");
    setErrorMessage("");
  };

  // ---- Register Field Handlers with Validation ----
  const handleRegisterNameChange = (name: string) => {
    setRegisterName(name);
    setIsNameValid(name.trim().length >= 2);
    setRegisterError("");
    setErrorMessage("");
  };

  const handleRegisterEmailChange = (email: string) => {
    setRegisterEmail(email);
    setIsRegisterEmailValid(email.length > 0 ? validateEmail(email) : null);
    setRegisterError("");
    setErrorMessage("");
  };

  const handlePhoneChange = (phone: string) => {
    setRegisterPhone(phone);
    setIsPhoneValid(phone.length > 0 ? validatePhone(phone) : null);
    setRegisterError("");
    setErrorMessage("");
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

  const getPasswordStrengthText = (strength: string | null): string => {
    if (!strength) return "";
    const map: Record<string, string> = {
      weak: t.passwordWeak || "Weak",
      moderate: t.passwordModerate || "Moderate",
      strong: t.passwordStrong || "Strong",
    };
    return map[strength] || strength;
  };

  const getPasswordStrengthColor = (strength: string | null): string => {
    if (!strength) return "";
    const map: Record<string, string> = {
      weak: "#ef4444",
      moderate: "#f59e0b",
      strong: "#22c55e",
    };
    return map[strength] || "";
  };

  const handlePasswordChange = (password: string) => {
    setRegisterPassword(password);
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
    setRegisterError("");
    setErrorMessage("");
    // Update confirm password validation
    if (registerConfirmPassword.length > 0) {
      setIsConfirmPasswordValid(password === registerConfirmPassword);
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setRegisterConfirmPassword(confirmPassword);
    setIsConfirmPasswordValid(
      confirmPassword.length > 0 && confirmPassword === registerPassword,
    );
    setRegisterError("");
    setErrorMessage("");
  };

  // ---- Form Validation ----
  const isLoginFormValid = (): boolean => {
    return (
      loginEmail.length > 0 &&
      validateEmail(loginEmail) &&
      loginPassword.length >= 6
    );
  };

  const isRegisterFormValid = (): boolean => {
    return (
      registerName.trim().length >= 2 &&
      registerEmail.length > 0 &&
      validateEmail(registerEmail) &&
      registerPhone.length > 0 &&
      validatePhone(registerPhone) &&
      registerPassword.length >= 6 &&
      registerPassword === registerConfirmPassword &&
      registerConfirmPassword.length > 0 &&
      passwordStrength !== null &&
      passwordStrength !== "weak"
    );
  };

  // ---- Reset Form ----
  const resetFormState = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPhone("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setRegisterError("");
    setIsLoginEmailValid(null);
    setIsLoginPasswordValid(null);
    setIsRegisterEmailValid(null);
    setIsPhoneValid(null);
    setIsNameValid(null);
    setIsConfirmPasswordValid(null);
    setPasswordStrength(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccess(null);
    setErrorMessage("");
  };

  // ---- Login Handler ----
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMessage("");

    if (!loginEmail || !validateEmail(loginEmail)) {
      setLoginError(t.invalidEmail || "Please enter a valid email address");
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      const response = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSuccess(true);
        toast.success(`✅ ${t.welcomeBack || "Welcome back"}, ${user.name}!`);
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage(response.data.message || "Invalid email or password");
        toast.error(`❌ ${response.data.message || "Login failed"}`);
      }
    } catch (error: any) {
      setSuccess(false);
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // ---- Register Handler ----
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMessage("");

    if (!registerName || registerName.length < 2) {
      setRegisterError("Full name is required (min 2 characters)");
      return;
    }
    if (!registerEmail || !validateEmail(registerEmail)) {
      setRegisterError("Please enter a valid email address");
      return;
    }
    if (!registerPhone || !validatePhone(registerPhone)) {
      setRegisterError("Please enter a valid Rwandan phone number");
      return;
    }
    if (!registerPassword || registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    if (passwordStrength === "weak") {
      setRegisterError("Please choose a stronger password");
      return;
    }

    setLoading(true);
    setRegisterError("");

    try {
      const response = await API.post("/auth/register", {
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
      });

      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSuccess(true);
        toast.success(
          `✅ ${t.accountCreated || "Account created!"}, ${user.name}!`,
        );
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage(response.data.message || "Registration failed");
        toast.error(`❌ ${response.data.message || "Registration failed"}`);
      }
    } catch (error: any) {
      setSuccess(false);
      const errorMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
    setLoginError("");
    setRegisterError("");
    setSuccess(null);
    setErrorMessage("");
  };

  const switchToRegister = () => {
    setMode("register");
    setLoginError("");
    setRegisterError("");
    setSuccess(null);
    setErrorMessage("");
  };

  // ---- Modal Effects ----
  useEffect(() => {
    if (!isOpen) {
      const timeoutId = window.setTimeout(resetFormState, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // ---- Render Success/Fail ----
  const renderSuccessFail = () => {
    if (success === null) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl z-50 p-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {success ? (
              <CheckCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            ) : (
              <CancelIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
            )}
          </motion.div>
          <h3
            className={`text-lg sm:text-xl font-bold ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {success
              ? mode === "login"
                ? `✅ ${t.loginSuccess || "Login Successful!"}`
                : `✅ ${t.registerSuccess || "Registration Successful!"}`
              : mode === "login"
                ? `❌ ${t.loginFailed || "Login Failed"}`
                : `❌ ${t.registerFailed || "Registration Failed"}`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {success
              ? mode === "login"
                ? `${t.welcomeBack || "Welcome back!"} Redirecting...`
                : `${t.accountCreated || "Account created!"} Redirecting...`
              : errorMessage || "Please try again."}
          </p>
          {!success && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSuccess(null)}
              className="mt-4 px-6 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
            >
              {t.tryAgain || "Try Again"}
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  // ---- Modal Animation Variants ----
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              {renderSuccessFail()}

              <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                <div className="flex items-center gap-2">
                  {mode === "login" ? (
                    <LoginIcon className="text-[#FF385C] w-5 h-5" />
                  ) : (
                    <PersonAddIcon className="text-[#FF385C] w-5 h-5" />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {mode === "login" ? t.login : t.signup}
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

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                  <button
                    onClick={switchToLogin}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      mode === "login"
                        ? "bg-white text-[#FF385C] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={switchToRegister}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      mode === "register"
                        ? "bg-white text-[#FF385C] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t.signup}
                  </button>
                </div>

                {mode === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Login Email Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email || "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isLoginEmailValid === true
                            ? "border-green-500"
                            : isLoginEmailValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isLoginEmailValid === true
                              ? "text-green-500"
                              : isLoginEmailValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) =>
                            handleLoginEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                          disabled={loading}
                          autoComplete="email"
                        />
                        {isLoginEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isLoginEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isLoginEmailValid === false && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidEmail || "Please enter a valid email"}
                        </p>
                      )}
                    </div>

                    {/* Login Password Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password || "Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isLoginPasswordValid === true
                            ? "border-green-500"
                            : isLoginPasswordValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isLoginPasswordValid === true
                              ? "text-green-500"
                              : isLoginPasswordValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) =>
                            handleLoginPasswordChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="current-password"
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
                        {isLoginPasswordValid === true && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isLoginPasswordValid === false &&
                          loginPassword.length > 0 && (
                            <CancelIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                          )}
                      </div>
                      {isLoginPasswordValid === false &&
                        loginPassword.length > 0 && (
                          <p className="text-xs text-red-500 mt-1">
                            Password must be at least 6 characters
                          </p>
                        )}
                    </div>

                    {loginError && (
                      <p className="text-sm text-red-500">{loginError}</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !isLoginFormValid()}
                      className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                        loading || !isLoginFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Logging in...
                        </div>
                      ) : (
                        t.login || "Log in"
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-gray-500">
                      {t.dontHaveAccount || "Don't have an account?"}{" "}
                      <button
                        type="button"
                        onClick={switchToRegister}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.signup || "Sign up"}
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Register Name Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.fullName || "Full Name"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isNameValid === true
                            ? "border-green-500"
                            : isNameValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <PersonIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isNameValid === true
                              ? "text-green-500"
                              : isNameValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="text"
                          value={registerName}
                          onChange={(e) =>
                            handleRegisterNameChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                          disabled={loading}
                          autoComplete="name"
                        />
                        {isNameValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isNameValid === false && registerName.length > 0 && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isNameValid === false && registerName.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          Name must be at least 2 characters
                        </p>
                      )}
                    </div>

                    {/* Register Email Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email || "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isRegisterEmailValid === true
                            ? "border-green-500"
                            : isRegisterEmailValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isRegisterEmailValid === true
                              ? "text-green-500"
                              : isRegisterEmailValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          value={registerEmail}
                          onChange={(e) =>
                            handleRegisterEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                          disabled={loading}
                          autoComplete="email"
                        />
                        {isRegisterEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isRegisterEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isRegisterEmailValid === false && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidEmail || "Please enter a valid email"}
                        </p>
                      )}
                    </div>

                    {/* Register Phone Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.phoneNumber || "Phone Number"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isPhoneValid === true
                            ? "border-green-500"
                            : isPhoneValid === false
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
                          value={registerPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="0788123456"
                          disabled={loading}
                          autoComplete="tel"
                        />
                        {isPhoneValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isPhoneValid === false && registerPhone.length > 0 && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isPhoneValid === false && registerPhone.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidPhone ||
                            "Please enter a valid phone number (e.g., 0788123456 or +250788123456)"}
                        </p>
                      )}
                    </div>

                    {/* Register Password Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password || "Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={registerPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="new-password"
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
                      </div>
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
                            <span
                              className="text-xs font-medium"
                              style={{
                                color:
                                  getPasswordStrengthColor(passwordStrength),
                              }}
                            >
                              {getPasswordStrengthText(passwordStrength)}
                            </span>
                          </div>
                          {passwordStrength === "weak" && (
                            <p className="text-xs text-red-500 mt-1">
                              Password is too weak. Use at least 8 characters
                              with uppercase, lowercase, numbers, and special
                              characters.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Register Confirm Password Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.confirmPassword || "Confirm Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isConfirmPasswordValid === true
                            ? "border-green-500"
                            : isConfirmPasswordValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isConfirmPasswordValid === true
                              ? "text-green-500"
                              : isConfirmPasswordValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerConfirmPassword}
                          onChange={(e) =>
                            handleConfirmPasswordChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="new-password"
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
                        {isConfirmPasswordValid === true && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isConfirmPasswordValid === false &&
                          registerConfirmPassword.length > 0 && (
                            <CancelIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                          )}
                      </div>
                      {isConfirmPasswordValid === false &&
                        registerConfirmPassword.length > 0 && (
                          <p className="text-xs text-red-500 mt-1">
                            Passwords do not match
                          </p>
                        )}
                    </div>

                    {registerError && (
                      <p className="text-sm text-red-500">{registerError}</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !isRegisterFormValid()}
                      className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                        loading || !isRegisterFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        t.signup || "Sign up"
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-gray-500">
                      {t.alreadyHaveAccount || "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.login || "Log in"}
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// REUSABLE SELECTION MODAL
// ============================================================

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title: string;
  icon: React.ReactNode;
  items: string[];
  searchPlaceholder: string;
  selectedValue: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title,
  icon,
  items,
  searchPlaceholder,
  selectedValue,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            className="fixed inset-2 sm:inset-4 z-[201] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
              <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2">
                  {icon}
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="relative mb-3">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                    autoFocus
                  />
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                          selectedValue === item
                            ? "bg-[#FF385C]/10 border border-[#FF385C]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {icon}
                        <span className="truncate flex-1">{item}</span>
                        {selectedValue === item && (
                          <CheckCircleIcon className="w-4 h-4 text-[#FF385C]" />
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm py-4">
                      No items found
                    </p>
                  )}
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
// MAIN HERO COMPONENT
// ============================================================

interface HeroProps {
  onSearch?: (params: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [language, setLanguage] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const t = getTranslations(language);

  // ===== Auth State =====
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState<
    "login" | "register"
  >("login");

  // ===== Price Categories =====
  const priceCategories = getPriceCategories(t);
  const [selectedPriceCategory, setSelectedPriceCategory] =
    useState<PriceCategory>("all");

  // ===== Search/Filter State =====
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [maxMinutesFromCampus, setMaxMinutesFromCampus] = useState<number>(30);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortOption, setSortOption] = useState<string>("");
  const [filteredHouses, setFilteredHouses] =
    useState<StudentHouse[]>(studentHousesData);

  // ===== Modal States =====
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState(false);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [isCellModalOpen, setIsCellModalOpen] = useState(false);
  const [isVillageModalOpen, setIsVillageModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedHouse, setSelectedHouse] = useState<StudentHouse | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ===== Booking State =====
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState({
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
      months: 1,
      guests: 1,
      specialRequests: "",
    },
    step3: {
      paymentMethod: "momo" as const,
      momoNumber: "",
      screenshot: null as File | null,
      screenshotPreview: "",
    },
  });

  // ===== Booking Validation =====
  const isBookingStep1Valid = (): boolean => {
    const { fullName, email, phone } = bookingData.step1;
    return (
      fullName.trim().length >= 2 &&
      validateEmail(email) &&
      validatePhone(phone)
    );
  };

  const isBookingStep2Valid = (): boolean => {
    const { checkIn, checkOut, months, guests } = bookingData.step2;
    return (
      checkIn.length > 0 && checkOut.length > 0 && months > 0 && guests > 0
    );
  };

  const isBookingStep3Valid = (): boolean => {
    const { momoNumber, screenshotPreview } = bookingData.step3;
    return validatePhone(momoNumber) && screenshotPreview.length > 0;
  };

  // ===== Check login status =====
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    let filtered = [...studentHousesData];

    if (selectedPriceCategory !== "all") {
      const category = priceCategories.find(
        (c) => c.id === selectedPriceCategory,
      );
      if (category) {
        filtered = filtered.filter(
          (h) => h.priceRWF >= category.min && h.priceRWF <= category.max,
        );
      }
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
  }, [
    selectedPriceCategory,
    priceCategories,
    searchQuery,
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

  // ===== Reset to page 1 when filters change =====
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPriceCategory,
    searchQuery,
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
    const isAnyModalOpen =
      isPropertyModalOpen ||
      isImageModalOpen ||
      isBookingModalOpen ||
      isLoginRegisterOpen ||
      isUniversityModalOpen ||
      isDistrictModalOpen ||
      isSectorModalOpen ||
      isCellModalOpen ||
      isVillageModalOpen ||
      isSuccessModalOpen;

    if (isAnyModalOpen) {
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
    isLoginRegisterOpen,
    isUniversityModalOpen,
    isDistrictModalOpen,
    isSectorModalOpen,
    isCellModalOpen,
    isVillageModalOpen,
    isSuccessModalOpen,
  ]);

  // ===== Booking Handlers =====
  const handleStep1Change = (field: string, value: string) => {
    setBookingData({
      ...bookingData,
      step1: { ...bookingData.step1, [field]: value },
    });
  };

  const handleStep2Change = (field: string, value: any) => {
    setBookingData({
      ...bookingData,
      step2: { ...bookingData.step2, [field]: value },
    });
  };

  const handleStep3Change = (field: string, value: any) => {
    setBookingData({
      ...bookingData,
      step3: { ...bookingData.step3, [field]: value },
    });
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
    };
    reader.readAsDataURL(file);
  };

  const nextStep = () => {
    if (currentStep === 1 && !isBookingStep1Valid()) {
      toast.warning(
        t.pleaseFillAllFields || "Please fill in all required fields",
      );
      return;
    }
    if (currentStep === 2 && !isBookingStep2Valid()) {
      toast.warning(
        t.pleaseFillAllFields || "Please fill in all required fields",
      );
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitBooking = async () => {
    if (currentStep === 3) {
      if (!isBookingStep3Valid()) {
        toast.warning(
          t.pleaseFillAllFields || "Please fill in all required fields",
        );
        return;
      }

      setSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const serviceFee = calculateServiceFee(selectedHouse?.priceRWF || 0);

        const orderData = {
          houseId: selectedHouse?.id,
          houseName: selectedHouse?.name,
          monthlyRent: selectedHouse?.priceRWF,
          months: bookingData.step2.months,
          totalRent: (selectedHouse?.priceRWF || 0) * bookingData.step2.months,
          serviceFee: serviceFee,
          totalAmount: serviceFee,
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

        setIsBookingModalOpen(false);
        setPaymentCompleted(true);
        setIsSuccessModalOpen(true);
        setCurrentStep(1);
        resetBookingData();
        toast.success(
          `✅ ${t.bookingSuccess || "Booking confirmed successfully!"}`,
        );
      } catch (error) {
        console.error("Booking error:", error);
        toast.error(`❌ ${t.bookingFailed || "Failed to confirm booking"}`);
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
        months: 1,
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
  };

  // ===== Handle Order Now Click =====
  const handleOrderNow = (house: StudentHouse) => {
    if (isLoggedIn) {
      setSelectedHouse(house);
      setCurrentStep(1);
      setPaymentCompleted(false);
      resetBookingData();
      setIsBookingModalOpen(true);
    } else {
      setSelectedHouse(house);
      setLoginRegisterMode("login");
      setIsLoginRegisterOpen(true);
    }
  };

  // ===== Handle Login Success =====
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (selectedHouse) {
      setTimeout(() => {
        setCurrentStep(1);
        setPaymentCompleted(false);
        resetBookingData();
        setIsBookingModalOpen(true);
      }, 300);
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

  const handleSearch = () => {
    const searchParams = {
      university: selectedUniversity,
      district: selectedDistrict,
      sector: selectedSector,
      cell: selectedCell,
      village: selectedVillage,
      maxMinutes: maxMinutesFromCampus,
      minPrice,
      maxPrice,
      sort: sortOption,
      priceCategory: selectedPriceCategory,
    };

    if (onSearch) {
      onSearch(searchParams);
    }

    toast.info(
      `🔍 ${t.search}: ${selectedUniversity || selectedDistrict || selectedSector || selectedCell || selectedVillage || "All locations in Rwanda"}`,
    );
    setIsUniversityModalOpen(false);
    setIsDistrictModalOpen(false);
    setIsSectorModalOpen(false);
    setIsCellModalOpen(false);
    setIsVillageModalOpen(false);
    setIsAdvancedSearchOpen(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPriceCategory("all");
    setSelectedUniversity("");
    setSelectedDistrict("");
    setSelectedSector("");
    setSelectedCell("");
    setSelectedVillage("");
    setMaxMinutesFromCampus(30);
    setMinPrice(0);
    setMaxPrice(200000);
    setSortOption("");
    setCurrentPage(1);
    toast.info("🧹 All filters cleared");
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
    if (type === "House") return "House";
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

  const getSectorsForDistrict = (district: string): string[] => {
    if (!district) return [];
    return ALL_SECTORS[district] || [];
  };

  const getCellsForSector = (sector: string): string[] => {
    if (!sector) return [];
    return ALL_CELLS[sector] || [];
  };

  const getVillagesForCell = (cell: string): string[] => {
    if (!cell) return [];
    return ALL_VILLAGES[cell] || [];
  };

  const getCategoryCount = (categoryId: PriceCategory) => {
    if (categoryId === "all") return studentHousesData.length;
    const category = priceCategories.find((c) => c.id === categoryId);
    if (!category) return 0;
    return studentHousesData.filter(
      (h) => h.priceRWF >= category.min && h.priceRWF <= category.max,
    ).length;
  };

  const getServiceFee = (): number => {
    return calculateServiceFee(selectedHouse?.priceRWF || 0);
  };

  const getUssdCode = (): string => {
    const fee = getServiceFee();
    return `*182*8*1*6377827*${fee}#`;
  };

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
    <>
      {/* Login/Register Modal */}
      <LoginRegisterModal
        isOpen={isLoginRegisterOpen}
        onClose={() => {
          setIsLoginRegisterOpen(false);
          setSelectedHouse(null);
        }}
        onSuccess={handleLoginSuccess}
        defaultMode={loginRegisterMode}
      />

      {/* University Modal */}
      <SelectionModal
        isOpen={isUniversityModalOpen}
        onClose={() => setIsUniversityModalOpen(false)}
        onSelect={(value) => {
          setSelectedUniversity(value);
          setSearchQuery(value);
          setSelectedDistrict("");
          setSelectedSector("");
          setSelectedCell("");
          setSelectedVillage("");
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.university}
        icon={<SchoolIcon className="w-5 h-5 text-[#FF385C]" />}
        items={uniqueUniversities}
        searchPlaceholder={t.searchByUniversity || "Search universities..."}
        selectedValue={selectedUniversity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* District Modal */}
      <SelectionModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
        onSelect={(value) => {
          setSelectedDistrict(value);
          setSelectedSector("");
          setSelectedCell("");
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.district}
        icon={<LocationCityIcon className="w-5 h-5 text-[#FF385C]" />}
        items={ALL_DISTRICTS}
        searchPlaceholder={t.searchDestinations || "Search districts..."}
        selectedValue={selectedDistrict}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Sector Modal */}
      <SelectionModal
        isOpen={isSectorModalOpen}
        onClose={() => setIsSectorModalOpen(false)}
        onSelect={(value) => {
          setSelectedSector(value);
          setSelectedCell("");
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.sector}
        icon={<ApartmentIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getSectorsForDistrict(selectedDistrict)}
        searchPlaceholder={t.selectSector || "Search sectors..."}
        selectedValue={selectedSector}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Cell Modal */}
      <SelectionModal
        isOpen={isCellModalOpen}
        onClose={() => setIsCellModalOpen(false)}
        onSelect={(value) => {
          setSelectedCell(value);
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.cell}
        icon={<DomainIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getCellsForSector(selectedSector)}
        searchPlaceholder={t.selectCell || "Search cells..."}
        selectedValue={selectedCell}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Village Modal */}
      <SelectionModal
        isOpen={isVillageModalOpen}
        onClose={() => setIsVillageModalOpen(false)}
        onSelect={(value) => {
          setSelectedVillage(value);
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.village}
        icon={<HomeIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getVillagesForCell(selectedCell)}
        searchPlaceholder={t.selectVillage || "Search villages..."}
        selectedValue={selectedVillage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={() => setIsSuccessModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[501] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.successTitle || "Payment Submitted Successfully!"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.successMessage ||
                      "Your payment has been recorded. Our team will verify it and you'll be notified."}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {t.paymentAmount || "Payment Amount"}:{" "}
                      <span className="text-[#FF385C] font-bold">
                        {formatCurrency(getServiceFee())}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {t.paymentApproval || "Payment Approval"}:{" "}
                      <span className="text-yellow-600 font-medium">
                        ⏳ {t.statusPending || "Pending"}
                      </span>
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      {t.landlordInfo || "Landlord Information"}
                    </p>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">
                        {t.landlordName || "Name"}:
                      </span>{" "}
                      {selectedHouse.owner}
                    </p>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">
                        {t.landlordPhone || "Phone"}:
                      </span>{" "}
                      {selectedHouse.contact}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    {t.paymentPending ||
                      "Your payment is being processed. You'll be notified once approved."}
                  </p>

                  <button
                    onClick={() => {
                      setIsSuccessModalOpen(false);
                      window.location.href = "/dashboard";
                    }}
                    className="w-full bg-[#FF385C] text-white py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                  >
                    {t.viewDashboard || "Go to Dashboard"}
                  </button>

                  <button
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="w-full mt-2 text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
                  >
                    {t.done || "Done"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="w-full mb-4 rounded-2xl">
        {/* ===== PROJECT HEADER ===== */}
        <div className="bg-gradient-to-b from-white to-gray-50 py-8 md:py-12 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                {language === "rw"
                  ? "GUKORA URUBUGA ABANYESHURI BA KAMINUZA BAZAJYA BAJYAHO BAKABONA AMAZU YO GUKONDESHA KUBURYO BUBOREHEYE"
                  : language === "fr"
                    ? "Plateforme de location de maisons pour étudiants près des universités au Rwanda"
                    : "Student housing rental platform near universities in Rwanda"}
              </p>
            </div>
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
              <div className="flex flex-wrap gap-2">
                {/* University Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsUniversityModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.university || "University"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedUniversity ||
                        t.clickToSelect ||
                        "Click to select"}
                    </div>
                  </button>
                </div>

                {/* District Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsDistrictModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.district || "District"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <LocationCityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedDistrict ||
                        t.selectDistrict ||
                        "Select District"}
                    </div>
                  </button>
                </div>

                {/* Sector Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedDistrict) {
                        toast.info("Please select a district first");
                        setIsDistrictModalOpen(true);
                        return;
                      }
                      setIsSectorModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.sectorLabel || "Sector"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <ApartmentIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedSector || t.selectSector || "Select Sector"}
                    </div>
                  </button>
                </div>

                {/* Cell Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedSector) {
                        toast.info("Please select a sector first");
                        setIsSectorModalOpen(true);
                        return;
                      }
                      setIsCellModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.cellLabel2 || "Cell"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <DomainIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedCell || t.selectCell || "Select Cell"}
                    </div>
                  </button>
                </div>

                {/* Village Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedCell) {
                        toast.info("Please select a cell first");
                        setIsCellModalOpen(true);
                        return;
                      }
                      setIsVillageModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.villageLabel2 || "Village"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedVillage || t.selectVillage || "Select Village"}
                    </div>
                  </button>
                </div>

                <div className="flex gap-1">
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
                    onClick={() =>
                      setIsAdvancedSearchOpen(!isAdvancedSearchOpen)
                    }
                    className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <FilterListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Advanced Search */}
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
                          onChange={(e) => {
                            setSelectedUniversity(e.target.value);
                            setCurrentPage(1);
                          }}
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
                          onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            setSelectedSector("");
                            setSelectedCell("");
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                        >
                          <option value="">All Districts</option>
                          {ALL_DISTRICTS.map((d) => (
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
                          onChange={(e) => {
                            setSelectedSector(e.target.value);
                            setSelectedCell("");
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedDistrict}
                        >
                          <option value="">All Sectors</option>
                          {getSectorsForDistrict(selectedDistrict).map((s) => (
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
                          onChange={(e) => {
                            setSelectedCell(e.target.value);
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedSector}
                        >
                          <option value="">All Cells</option>
                          {getCellsForSector(selectedSector).map((c) => (
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
                          onChange={(e) => {
                            setSelectedVillage(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedCell}
                        >
                          <option value="">All Villages</option>
                          {getVillagesForCell(selectedCell).map((v) => (
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

                      <div className="flex items-end gap-2">
                        <button
                          onClick={clearAllFilters}
                          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
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

        {/* ===== PRICE CATEGORIES + HOUSES GRID ===== */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-6 sm:mt-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Left side: Houses Grid */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-4 sm:mb-6">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={t.searchProperties || "Search houses..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF385C] bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div>
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
                        {t.district}: {selectedDistrict}
                      </p>
                    )}
                    {selectedSector && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.sectorLabel}: {selectedSector}
                      </p>
                    )}
                    {selectedCell && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.cellLabel2}: {selectedCell}
                      </p>
                    )}
                    {selectedVillage && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.villageLabel2}: {selectedVillage}
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

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
                          {house.code_vil_1 && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px]">
                              Code: {house.code_vil_1}
                            </div>
                          )}
                          <div className="absolute bottom-2 left-20 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs">
                            {house.minutesFromCampus}m
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
                          <div className="rouded-lg">
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getStatusColor(house.bookingStatus)}`}
                            >
                              {getStatusText(house.bookingStatus)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 md:mt-10"
                  >
                    <button
                      onClick={() => {
                        if (currentPage > 1) goToPage(currentPage - 1);
                      }}
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
                            (page === totalPages - 1 &&
                              currentPage < totalPages - 2)
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
                                className="w-6 h-6 flex items-center justify-center text-gray-400"
                              >
                                …
                              </span>
                            );
                          }
                          if (
                            page === totalPages - 1 &&
                            currentPage < totalPages - 2
                          ) {
                            return (
                              <span
                                key="ellipsis-end"
                                className="w-6 h-6 flex items-center justify-center text-gray-400"
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
                      onClick={() => {
                        if (currentPage < totalPages) goToPage(currentPage + 1);
                      }}
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
                    <p className="text-gray-500 text-sm sm:text-base">
                      {t.noResults}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Price Categories */}
            <div className="lg:w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AttachMoneyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                    {t.priceCategories}
                  </h3>
                  <div className="space-y-1.5">
                    {priceCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedPriceCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                          selectedPriceCategory === category.id
                            ? "bg-[#FF385C]/10 border-2 border-[#FF385C] shadow-sm"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {React.cloneElement(
                            category.icon as React.ReactElement,
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {category.label}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {category.range} • {getCategoryCount(category.id)}
                          </p>
                        </div>
                        {selectedPriceCategory === category.id && (
                          <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C] flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
          PROPERTY DETAIL MODAL
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                  <div className="relative">
                    <div className="relative h-56 sm:h-40 md:h-50 lg:h-60 overflow-hidden bg-gray-900">
                      <img
                        src={selectedHouse.images[currentImageIndex]}
                        alt={`${selectedHouse.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                        {currentImageIndex + 1} / {selectedHouse.images.length}
                      </div>
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
                    <button
                      onClick={() => openImageModal(currentImageIndex)}
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1 transition-colors"
                    >
                      <VisibilityIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Full Screen</span>
                    </button>
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
                          if (
                            amenity === "Kitchen" ||
                            amenity === "Kitchenette"
                          )
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
                              {t.perMonth}
                            </span>
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                            ${selectedHouse.price} USD
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
                              handleOrderNow(selectedHouse);
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
          IMAGE MODAL
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
                onClick={(e) => e.stopPropagation()}
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
          BOOKING MODAL - WITH FULL VALIDATION
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
                onClick={(e) => e.stopPropagation()}
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
                      <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                              className={`w-4 sm:w-6 md:w-12 h-0.5 mx-0.5 sm:mx-1 md:mx-2 ${
                                currentStep > step
                                  ? "bg-[#FF385C]"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                    {/* Step 1: Personal Information with Validation */}
                    {currentStep === 1 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.fullName || "Full Name"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={bookingData.step1.fullName}
                                onChange={(e) =>
                                  handleStep1Change("fullName", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.fullName.length > 0 &&
                                  bookingData.step1.fullName.length < 2
                                    ? "border-red-500"
                                    : bookingData.step1.fullName.length >= 2
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="John Doe"
                              />
                              {bookingData.step1.fullName.length >= 2 && (
                                <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                              {bookingData.step1.fullName.length > 0 &&
                                bookingData.step1.fullName.length < 2 && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.fullName.length > 0 &&
                              bookingData.step1.fullName.length < 2 && (
                                <p className="text-xs text-red-500 mt-1">
                                  Name must be at least 2 characters
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.email || "Email"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                value={bookingData.step1.email}
                                onChange={(e) =>
                                  handleStep1Change("email", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.email.length > 0 &&
                                  !validateEmail(bookingData.step1.email)
                                    ? "border-red-500"
                                    : bookingData.step1.email.length > 0 &&
                                        validateEmail(bookingData.step1.email)
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="john@example.com"
                              />
                              {bookingData.step1.email.length > 0 &&
                                validateEmail(bookingData.step1.email) && (
                                  <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                              {bookingData.step1.email.length > 0 &&
                                !validateEmail(bookingData.step1.email) && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.email.length > 0 &&
                              !validateEmail(bookingData.step1.email) && (
                                <p className="text-xs text-red-500 mt-1">
                                  {t.invalidEmail ||
                                    "Please enter a valid email"}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.phoneNumber || "Phone Number"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                value={bookingData.step1.phone}
                                onChange={(e) =>
                                  handleStep1Change("phone", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.phone.length > 0 &&
                                  !validatePhone(bookingData.step1.phone)
                                    ? "border-red-500"
                                    : bookingData.step1.phone.length > 0 &&
                                        validatePhone(bookingData.step1.phone)
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="+250788123456"
                              />
                              {bookingData.step1.phone.length > 0 &&
                                validatePhone(bookingData.step1.phone) && (
                                  <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                              {bookingData.step1.phone.length > 0 &&
                                !validatePhone(bookingData.step1.phone) && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.phone.length > 0 &&
                              !validatePhone(bookingData.step1.phone) && (
                                <p className="text-xs text-red-500 mt-1">
                                  {t.invalidPhone ||
                                    "Please enter a valid phone number"}
                                </p>
                              )}
                          </div>
                          <div>
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
                          <div>
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
                          <div>
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
                        <div>
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

                    {/* Step 2: Booking Details with Validation */}
                    {currentStep === 2 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.checkIn || "Check-in Date"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={bookingData.step2.checkIn}
                              onChange={(e) =>
                                handleStep2Change("checkIn", e.target.value)
                              }
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.checkIn.length > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.checkOut || "Check-out Date"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={bookingData.step2.checkOut}
                              onChange={(e) => {
                                const checkOut = e.target.value;
                                const months =
                                  bookingData.step2.checkIn && checkOut
                                    ? Math.ceil(
                                        (new Date(checkOut).getTime() -
                                          new Date(
                                            bookingData.step2.checkIn,
                                          ).getTime()) /
                                          (1000 * 60 * 60 * 24 * 30),
                                      )
                                    : 1;
                                setBookingData({
                                  ...bookingData,
                                  step2: {
                                    ...bookingData.step2,
                                    checkOut,
                                    months: months > 0 ? months : 1,
                                  },
                                });
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.checkOut.length > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.months || "Months"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={bookingData.step2.months}
                              onChange={(e) =>
                                handleStep2Change(
                                  "months",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              min="1"
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.months > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.guests || "Guests"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={bookingData.step2.guests}
                              onChange={(e) =>
                                handleStep2Change(
                                  "guests",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              min="1"
                              max={10}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.guests > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.specialRequests || "Special Requests"}
                          </label>
                          <textarea
                            value={bookingData.step2.specialRequests}
                            onChange={(e) =>
                              handleStep2Change(
                                "specialRequests",
                                e.target.value,
                              )
                            }
                            rows={2}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                            placeholder="Any special requests..."
                          />
                        </div>

                        {/* Summary - Shows Service Fee */}
                        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4">
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.monthlyRent || "Monthly Rent"}:
                            </span>{" "}
                            {formatCurrency(selectedHouse.priceRWF)}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.months || "Months"}:
                            </span>{" "}
                            {bookingData.step2.months}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.serviceFee || "Service Fee"}:
                            </span>{" "}
                            {formatCurrency(getServiceFee())}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-semibold text-[#FF385C]">
                            <span className="font-medium">
                              {t.totalAmount || "Total Amount to Pay"}:
                            </span>{" "}
                            {formatCurrency(getServiceFee())}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment with Validation */}
                    {currentStep === 3 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            {t.paymentMethod || "Payment Method"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
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

                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.momoNumber || "MOMO Number"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bookingData.step3.momoNumber || ""}
                              onChange={(e) =>
                                handleStep3Change("momoNumber", e.target.value)
                              }
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step3.momoNumber.length > 0 &&
                                !validatePhone(bookingData.step3.momoNumber)
                                  ? "border-red-500"
                                  : bookingData.step3.momoNumber.length > 0 &&
                                      validatePhone(
                                        bookingData.step3.momoNumber,
                                      )
                                    ? "border-green-500"
                                    : "border-gray-300"
                              }`}
                              placeholder="0788123456"
                            />
                            {bookingData.step3.momoNumber.length > 0 &&
                              validatePhone(bookingData.step3.momoNumber) && (
                                <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                            {bookingData.step3.momoNumber.length > 0 &&
                              !validatePhone(bookingData.step3.momoNumber) && (
                                <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                              )}
                          </div>
                          {bookingData.step3.momoNumber.length > 0 &&
                            !validatePhone(bookingData.step3.momoNumber) && (
                              <p className="text-xs text-red-500 mt-1">
                                {t.invalidPhone ||
                                  "Please enter a valid phone number"}
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
                                {t.totalAmount || "Total Amount to Pay"}
                              </p>
                              <p className="font-bold text-[#FF385C] text-sm sm:text-base md:text-lg">
                                {formatCurrency(getServiceFee())}
                              </p>
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1 mt-1 sm:mt-2">
                                {t.ussdCode || "USSD Code"}
                              </p>
                              <p className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#FF385C]">
                                {getUssdCode()}
                              </p>
                              <a
                                href={`tel:${getUssdCode().replace(/\*/g, "%2A").replace(/#/g, "%23")}`}
                                className="inline-block mt-1 sm:mt-2 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-[#FF385C] text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:bg-[#E31C5F] transition-colors"
                              >
                                📞 {t.dialNow || "Dial Now"}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.uploadPaymentProof ||
                              "Upload Payment Screenshot"}{" "}
                            <span className="text-red-500">*</span>
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
                              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border rounded-lg transition-colors cursor-pointer text-[10px] sm:text-xs md:text-sm flex items-center gap-0.5 sm:gap-1 md:gap-2 ${
                                bookingData.step3.screenshotPreview
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
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
                              {bookingData.step3.screenshotPreview
                                ? "Change File"
                                : t.chooseFile || "Choose File"}
                            </label>
                            {bookingData.step3.screenshotPreview && (
                              <div className="relative">
                                <img
                                  src={bookingData.step3.screenshotPreview}
                                  alt="Payment Screenshot"
                                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg border border-green-500"
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
                                  }}
                                  className="absolute -top-1 sm:-top-1.5 md:-top-2 -right-1 sm:-right-1.5 md:-right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                  <CancelIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          {!bookingData.step3.screenshotPreview && (
                            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-red-500">
                              Please upload a payment confirmation screenshot
                            </p>
                          )}
                          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                            {t.uploadPaymentProof ||
                              "Upload your payment confirmation screenshot"}
                          </p>
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
                          (currentStep === 1 && !isBookingStep1Valid()) ||
                          (currentStep === 2 && !isBookingStep2Valid()) ||
                          (currentStep === 3 && !isBookingStep3Valid())
                        }
                        className={`flex-1 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm ${
                          submitting ||
                          (currentStep === 1 && !isBookingStep1Valid()) ||
                          (currentStep === 2 && !isBookingStep2Valid()) ||
                          (currentStep === 3 && !isBookingStep3Valid())
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
                            <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
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
      </div>
    </>
  );
};
function setPaymentCompleted(arg0: boolean) {
  void arg0;
  throw new Error("Function not implemented.");
}
