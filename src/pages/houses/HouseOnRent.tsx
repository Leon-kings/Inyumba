
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import WifiIcon from "@mui/icons-material/Wifi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DomainIcon from "@mui/icons-material/Domain";
import LocationCityIcon from "@mui/icons-material/LocationCity";

// ============================================================
// ALL 30 DISTRICTS OF RWANDA
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
// TYPES
// ============================================================

interface House {
  [key: string]: any;
  id?: string | number;
  houseId?: string | number;
  location: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
  };
  name: string;
  type: string;
  price: number;
  priceRWF: number;
  nights: number;
  rating: number;
  category: string;
  university: string;
  rooms: number;
  bathrooms: number;
  images: string[];
  description: string;
  amenities: string[];
  owner: string;
  contact: string;
  bookingStatus: string;
  status?: string;
  minutesFromCampus: number;
  features: string[];
  yearBuilt: number;
  totalReviews?: number;
  maxGuests?: number;
  host?: {
    name: string;
    phone: string;
    email: string;
  };
}

interface BookingData {
  step1: {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    university: string;
    studentId: string;
    purpose: string;
  };
  step2: {
    checkIn: string;
    checkOut: string;
    months: number;
    guests: number;
    specialRequests: string;
  };
  step3: {
    paymentMethod: "momo";
    momoNumber: string;
    screenshot: File | null;
    screenshotPreview: string;
  };
}

// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {
  en: {
    services: "Our House On Rent Services",
    tagline: "Find Your Perfect Student Home",
    description:
      "Discover verified student housing near your university across Rwanda. Safe, affordable, and comfortable accommodation for every student.",
    sortBy: "Sort by",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    ratingHighToLow: "Rating: High to Low",
    mostPopular: "Most Popular",
    viewDetails: "View Details",
    bookNow: "Book Now",
    available: "Available",
    booked: "Booked",
    maintenance: "Under Maintenance",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    maxGuests: "Max Guests",
    perMonth: "per month",
    amenities: "Amenities",
    location: "Location",
    hostInfo: "Host Information",
    noHouses: "No houses found",
    adjustFilters: "Try adjusting your search filters",
    showing: "Showing",
    of: "of",
    results: "results",
    houseDetails: "House Details",
    priceDetails: "Price Details",
    pricePerMonth: "Price per Month",
    bookThisHouse: "Book This House",
    close: "Close",
    step: "Step",
    personalInfo: "Personal Information",
    bookingDetails: "Booking Details",
    payment: "Payment",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    idNumber: "ID Number",
    university: "University",
    studentId: "Student ID",
    purpose: "Purpose of Stay",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    months: "Months",
    guests: "Guests",
    specialRequests: "Special Requests",
    paymentMethod: "Payment Method",
    momo: "MOMO",
    momoNumber: "MOMO Number",
    uploadScreenshot: "Upload Payment Screenshot",
    chooseFile: "Choose File",
    totalAmount: "Total Amount",
    confirmBooking: "Confirm Booking",
    previous: "Previous",
    next: "Next",
    submitting: "Submitting...",
    bookingSuccess: "Booking confirmed successfully!",
    bookingFailed: "Failed to confirm booking",
    pleaseFillAllFields: "Please fill in all required fields",
    paymentInfo: "Payment Information",
    payWithMomo: "Pay with MOMO",
    momoPaymentInstructions: "Please pay using the USSD code below:",
    momoCode: "*182*8*1*6377827*",
    uploadPaymentProof: "Upload your payment confirmation screenshot",
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
    bookingSuccessful: "Booking Successful! 🎉",
    bookingSuccessfulDesc: "Your booking has been confirmed successfully.",
    bookingReference: "Booking Reference",
    viewBookingDetails: "View Booking Details",
    bookingFailedTitle: "Booking Failed ❌",
    bookingFailedDesc: "There was an issue processing your booking.",
    tryAgain: "Try Again",
    goBack: "Go Back",
    bookingDetailsSummary: "Booking Summary",
    houseName: "House Name",
    totalMonths: "Total Months",
    totalGuests: "Total Guests",
    checkInDate: "Check-in Date",
    checkOutDate: "Check-out Date",
    amountPaid: "Amount Paid",
    paymentMethodUsed: "Payment Method",
    login: "Log in",
    signup: "Sign up",
    loginSuccess: "Login successful!",
    loginFailed: "Login failed. Please try again.",
    registerSuccess: "Registration successful!",
    registerFailed: "Registration failed. Please try again.",
    welcomeBack: "Welcome back",
    accountCreated: "Account created! Welcome",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    password: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    fullNameLabel: "Full Name",
    priceCategories: "Price Categories",
    categoryLow: "Low (0 - 80,000 RWF)",
    categoryMedium: "Medium (80,001 - 105,000 RWF)",
    categoryHigh: "High (105,001 - 130,000 RWF)",
    allHouses: "All Houses",
    prev: "Prev",
    nextLabel: "Next",
    passwordWeak: "Weak",
    passwordModerate: "Moderate",
    passwordStrong: "Strong",
    search: "Search",
    searchProperties: "Search houses...",
    district: "District",
    sector: "Sector",
    cell: "Cell",
    village: "Village",
    selectDistrict: "Select District",
    selectSector: "Select Sector",
    selectCell: "Select Cell",
    selectVillage: "Select Village",
    resetFilters: "Reset Filters",
    clickToSelect: "Click to select",
    province: "Province",
    minutesFromCampus: "Minutes from Campus",
    filters: "Filters",
    advancedSearch: "Advanced Search",
    monthlyRent: "Monthly Rent",
  },
  fr: {
    services: "Nos Services",
    tagline: "Trouvez Votre Maison Étudiante Parfaite",
    description:
      "Découvrez des logements étudiants vérifiés près de votre université à travers le Rwanda. Un hébergement sûr, abordable et confortable pour chaque étudiant.",
    sortBy: "Trier par",
    priceLowToHigh: "Prix: Croissant",
    priceHighToLow: "Prix: Décroissant",
    ratingHighToLow: "Note: Décroissante",
    mostPopular: "Les Plus Populaires",
    viewDetails: "Voir les Détails",
    bookNow: "Réserver Maintenant",
    available: "Disponible",
    booked: "Réservé",
    maintenance: "En Maintenance",
    bedrooms: "Chambres",
    bathrooms: "Salles de Bain",
    maxGuests: "Max Invités",
    perMonth: "par mois",
    amenities: "Équipements",
    location: "Emplacement",
    hostInfo: "Informations sur l'Hôte",
    noHouses: "Aucune maison trouvée",
    adjustFilters: "Essayez d'ajuster vos filtres de recherche",
    showing: "Affichage",
    of: "de",
    results: "résultats",
    houseDetails: "Détails de la Maison",
    priceDetails: "Détails des Prix",
    pricePerMonth: "Prix par Mois",
    bookThisHouse: "Réserver Cette Maison",
    close: "Fermer",
    step: "Étape",
    personalInfo: "Informations Personnelles",
    bookingDetails: "Détails de la Réservation",
    payment: "Paiement",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone",
    idNumber: "Numéro d'Identité",
    university: "Université",
    studentId: "ID Étudiant",
    purpose: "Motif du Séjour",
    checkIn: "Date d'Arrivée",
    checkOut: "Date de Départ",
    months: "Mois",
    guests: "Invités",
    specialRequests: "Demandes Spéciales",
    paymentMethod: "Méthode de Paiement",
    momo: "MOMO",
    momoNumber: "Numéro MOMO",
    uploadScreenshot: "Télécharger la Capture de Paiement",
    chooseFile: "Choisir un Fichier",
    totalAmount: "Montant Total",
    confirmBooking: "Confirmer la Réservation",
    previous: "Précédent",
    next: "Suivant",
    submitting: "Soumission...",
    bookingSuccess: "Réservation confirmée avec succès !",
    bookingFailed: "Échec de la confirmation de la réservation",
    pleaseFillAllFields: "Veuillez remplir tous les champs requis",
    paymentInfo: "Informations de Paiement",
    payWithMomo: "Payer avec MOMO",
    momoPaymentInstructions:
      "Veuillez payer en utilisant le code USSD ci-dessous :",
    momoCode: "*182*8*1*6377827*",
    uploadPaymentProof: "Téléchargez votre capture de confirmation de paiement",
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
    bookingSuccessful: "Réservation Réussie ! 🎉",
    bookingSuccessfulDesc: "Votre réservation a été confirmée avec succès.",
    bookingReference: "Référence de Réservation",
    viewBookingDetails: "Voir les Détails de la Réservation",
    bookingFailedTitle: "Échec de la Réservation ❌",
    bookingFailedDesc:
      "Un problème est survenu lors du traitement de votre réservation.",
    tryAgain: "Réessayer",
    goBack: "Retour",
    bookingDetailsSummary: "Résumé de la Réservation",
    houseName: "Nom de la Maison",
    totalMonths: "Total des Mois",
    totalGuests: "Total des Invités",
    checkInDate: "Date d'Arrivée",
    checkOutDate: "Date de Départ",
    amountPaid: "Montant Payé",
    paymentMethodUsed: "Méthode de Paiement",
    login: "Se connecter",
    signup: "S'inscrire",
    loginSuccess: "Connexion réussie !",
    loginFailed: "Échec de la connexion. Veuillez réessayer.",
    registerSuccess: "Inscription réussie !",
    registerFailed: "Échec de l'inscription. Veuillez réessayer.",
    welcomeBack: "Bon retour",
    accountCreated: "Compte créé ! Bienvenue",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    phoneNumber: "Téléphone",
    emailAddress: "Adresse Email",
    fullNameLabel: "Nom Complet",
    priceCategories: "Catégories de Prix",
    categoryLow: "Bas (0 - 80,000 RWF)",
    categoryMedium: "Moyen (80,001 - 105,000 RWF)",
    categoryHigh: "Élevé (105,001 - 130,000 RWF)",
    allHouses: "Toutes les Maisons",
    prev: "Précédent",
    nextLabel: "Suivant",
    passwordWeak: "Faible",
    passwordModerate: "Modéré",
    passwordStrong: "Fort",
    search: "Rechercher",
    searchProperties: "Rechercher des maisons...",
    district: "District",
    sector: "Secteur",
    cell: "Cellule",
    village: "Village",
    selectDistrict: "Sélectionner le District",
    selectSector: "Sélectionner le Secteur",
    selectCell: "Sélectionner la Cellule",
    selectVillage: "Sélectionner le Village",
    resetFilters: "Réinitialiser les Filtres",
    clickToSelect: "Cliquer pour sélectionner",
    province: "Province",
    minutesFromCampus: "Minutes du campus",
    filters: "Filtres",
    advancedSearch: "Recherche avancée",
    monthlyRent: "Loyer Mensuel",
  },
  rw: {
    services: "Serivisi Zacu",
    tagline: "Shaka Inzu Nziza y'Umunyeshuri",
    description:
      "Shakisha amazu y'Abanyeshuri yagenzuwe hafi ya Kaminuza yawe mu Rwanda. Amaherezo meza, ari buhendi kandi ahumuriza buri munyeshuri.",
    sortBy: "Tondekanya",
    priceLowToHigh: "Igiciro: Gito kuri Kinini",
    priceHighToLow: "Igiciro: Kinini kuri Gito",
    ratingHighToLow: "Amanota: Kinini kuri Gito",
    mostPopular: "Izikunzwe Cyane",
    viewDetails: "Reba Ibisobanuro",
    bookNow: "Kora Booking",
    available: "Irahari",
    booked: "Yarakorewe Booking",
    maintenance: "Iri mu Rwanda",
    bedrooms: "Ibyumba",
    bathrooms: "Amazu y'isuku",
    maxGuests: "Abashyitsi Benshi",
    perMonth: "ku kwezi",
    amenities: "Ibikoresho",
    location: "Aho Gihe",
    hostInfo: "Amakuru y'Umutambyi",
    noHouses: "Nta nzu yabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha",
    showing: "Bereka",
    of: "muri",
    results: "ibisubizo",
    houseDetails: "Ibisobanuro by'Inzu",
    priceDetails: "Ibisobanuro by'Igiciro",
    pricePerMonth: "Igiciro ku Kwezi",
    bookThisHouse: "Kora Booking ya Inzu",
    close: "Funga",
    step: "Intambwe",
    personalInfo: "Amakuru yawe",
    bookingDetails: "Amakuru yo gutura",
    payment: "Kwishyura",
    fullName: "Izina Ryose",
    email: "Imeri",
    phone: "Telefone",
    idNumber: "Nomero y'Indangamuntu",
    university: "Kaminuza",
    studentId: "ID y'Umunyeshuri",
    purpose: "Impamvu yo Gutura",
    checkIn: "Itariki yo Kwinjira",
    checkOut: "Itariki yo Kuva",
    months: "Amezi",
    guests: "Abashyitsi",
    specialRequests: "Ibisabwa Bidasanzwe",
    paymentMethod: "Uburyo bwo Kwishyura",
    momo: "MOMO",
    momoNumber: "Nomero ya MOMO",
    uploadScreenshot: "Ongeraho Ishusho y'Ubwishyu",
    chooseFile: "Hitamo Dosive",
    totalAmount: "Igiciro Cyose",
    confirmBooking: "Emeza Booking",
    previous: "Inyuma",
    next: "Ubutaha",
    submitting: "Biremereza...",
    bookingSuccess: "Booking yemejwe neza!",
    bookingFailed: "Kurema booking birananiranye",
    pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
    paymentInfo: "Amakuru y'Ubwishyu",
    payWithMomo: "Kwishyura ukoresheje MOMO",
    momoPaymentInstructions: "Kwishyura ukoresheje kode ya USSD ikurikira:",
    momoCode: "*182*8*1*6377827*",
    uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
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
    bookingSuccessful: "Booking Yagenzutse! 🎉",
    bookingSuccessfulDesc: "Booking yawe yemejwe neza.",
    bookingReference: "Nomero ya Booking",
    viewBookingDetails: "Reba Ibisobanuro bya Booking",
    bookingFailedTitle: "Booking Yananiye ❌",
    bookingFailedDesc: "Hari ikibazo cyabaye mugihe cyo kurema booking.",
    tryAgain: "Ongera Ugerageze",
    goBack: "Garuka",
    bookingDetailsSummary: "Ibisobanuro bya Booking",
    houseName: "Izina ry'Inzu",
    totalMonths: "Amezi Yose",
    totalGuests: "Abashyitsi Benshi",
    checkInDate: "Itariki yo Kwinjira",
    checkOutDate: "Itariki yo Kuva",
    amountPaid: "Amahera Yishyuwe",
    paymentMethodUsed: "Uburyo bwo Kwishyura",
    login: "Kwinjira",
    signup: "Kwiyandikisha",
    loginSuccess: "Kwinjira byakunze!",
    loginFailed: "Kwinjira byananiranye. Ongera ugerageze.",
    registerSuccess: "Kwiyandikisha byakunze!",
    registerFailed: "Kwiyandikisha byananiranye. Ongera ugerageze.",
    welcomeBack: "Murakaza neza",
    accountCreated: "Konti yashizweho! Murakaza neza",
    alreadyHaveAccount: "Ufite konti?",
    dontHaveAccount: "Nta konti ufite?",
    password: "Ijambo ryibanga",
    confirmPassword: "Emeza ijambo ryibanga",
    phoneNumber: "Telefone",
    emailAddress: "Imeri",
    fullNameLabel: "Izina Ryose",
    priceCategories: "Ibikorwa by'Igiciro",
    categoryLow: "Hasi (0 - 80,000 RWF)",
    categoryMedium: "Hagati (80,001 - 105,000 RWF)",
    categoryHigh: "Hejuru (105,001 - 130,000 RWF)",
    allHouses: "Amazu Yose",
    prev: "Inyuma",
    nextLabel: "Ubutaha",
    passwordWeak: "Icyatsi",
    passwordModerate: "Hagati",
    passwordStrong: "Gikomeye",
    search: "Shakisha",
    searchProperties: "Shakisha amazu...",
    district: "Akarere",
    sector: "Umurenge",
    cell: "Akagari",
    village: "Umudugudu",
    selectDistrict: "Hitamo Akarere",
    selectSector: "Hitamo Umurenge",
    selectCell: "Hitamo Akagari",
    selectVillage: "Hitamo Umudugudu",
    resetFilters: "Kuraho Iyo Myunyu",
    clickToSelect: "Kanda kugirango uhitemo",
    province: "Intara",
    minutesFromCampus: "Iminota uva kuri kaminuza",
    filters: "Imyunyu",
    advancedSearch: "Ubushakashatsi buhanitse",
    monthlyRent: "Igiciro cy'Ukwezi",
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^(\+250|0)?[7-9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
};

const calculateServiceFee = (monthlyRent: number): number => {
  return Math.round(monthlyRent * 0.05);
};

const formatCurrency = (amount: number): string => {
  return `RWF ${amount.toLocaleString()}`;
};

// ============================================================
// MOCK DATA - STUDENT HOUSES (FIXED - ALL HAVE LOCATION OBJECT)
// ============================================================

const MOCK_HOUSES: House[] = [
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Gihanga",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
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
    status: "available",
    minutesFromCampus: 5,
    features: ["Solar Panels", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
    totalReviews: 45,
    host: {
      name: "Ntwari Jean Rene",
      phone: "+250 780414088",
      email: "jean@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Iterambere",
    },
    rooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Spacious apartments near UR-CST, perfect for students.",
    amenities: ["WiFi", "Kitchen", "Security", "Water Heater"],
    owner: "Mukamana Alice",
    contact: "+250 788123456",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Water Heater", "Balcony"],
    yearBuilt: 2021,
    totalReviews: 32,
    host: {
      name: "Mukamana Alice",
      phone: "+250 788123456",
      email: "alice@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Izuba",
    },
    rooms: 5,
    bathrooms: 2,
    maxGuests: 8,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Large student house with garden, near UR-CST.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area"],
    owner: "Habimana Jean",
    contact: "+250 788654321",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 10,
    features: ["Garden", "BBQ Area"],
    yearBuilt: 2020,
    totalReviews: 28,
    host: {
      name: "Habimana Jean",
      phone: "+250 788654321",
      email: "jean.h@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Sunrise",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Affordable student hostel with shared facilities.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area", "Common Room"],
    owner: "Uwimana Grace",
    contact: "+250 788789012",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 12,
    features: ["Study Desk", "Common Room"],
    yearBuilt: 2020,
    totalReviews: 19,
    host: {
      name: "Uwimana Grace",
      phone: "+250 788789012",
      email: "grace@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Peaceful",
    },
    rooms: 4,
    bathrooms: 3,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Peaceful student housing with garden and parking.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
    owner: "Rukundo Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 22,
    host: {
      name: "Rukundo Jean",
      phone: "+250 788901234",
      email: "rukundo@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Green Valley",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Green Valley apartments with scenic views and study spaces.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Balcony"],
    owner: "Mugisha David",
    contact: "+250 788012345",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 18,
    host: {
      name: "Mugisha David",
      phone: "+250 788012345",
      email: "david@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Kigali Heights",
    },
    rooms: 5,
    bathrooms: 3,
    maxGuests: 8,
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
    status: "available",
    minutesFromCampus: 4,
    features: ["Solar Panels", "Water Heater", "Study Desk", "Garden"],
    yearBuilt: 2023,
    totalReviews: 36,
    host: {
      name: "Kagame Peter",
      phone: "+250 788123456",
      email: "peter@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Ruhango",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Student village with community atmosphere.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Laundry"],
    owner: "Niyomugabo Eric",
    contact: "+250 788234567",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 11,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
    totalReviews: 15,
    host: {
      name: "Niyomugabo Eric",
      phone: "+250 788234567",
      email: "eric@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Muhanga",
    },
    rooms: 2,
    bathrooms: 1,
    maxGuests: 3,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Affordable residence for students.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Niyonzima Anne",
    contact: "+250 788345678",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 13,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 12,
    host: {
      name: "Niyonzima Anne",
      phone: "+250 788345678",
      email: "anne@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Nyabugogo",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student house in Nyabugogo area, accessible to campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Habineza James",
    contact: "+250 788456789",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Parking", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 20,
    host: {
      name: "Habineza James",
      phone: "+250 788456789",
      email: "james@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Kicukiro",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for students.",
    amenities: ["WiFi", "Shared Kitchen", "Common Room", "Study Area"],
    owner: "Uwera Sarah",
    contact: "+250 788567890",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 14,
    features: ["Common Room"],
    yearBuilt: 2019,
    totalReviews: 10,
    host: {
      name: "Uwera Sarah",
      phone: "+250 788567890",
      email: "sarah@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Kimihurura",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments in Kimihurura, near amenities and campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Balcony"],
    owner: "Rwema Daniel",
    contact: "+250 788678901",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 24,
    host: {
      name: "Rwema Daniel",
      phone: "+250 788678901",
      email: "daniel@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Remera",
    },
    rooms: 4,
    bathrooms: 3,
    maxGuests: 7,
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
    status: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Solar Panels", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 26,
    host: {
      name: "Muhire Emmanuel",
      phone: "+250 788789012",
      email: "emmanuel@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Kacyiru",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Student village in Kacyiru with community facilities.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area", "Laundry"],
    owner: "Ishimwe Grace",
    contact: "+250 788890123",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 17,
    host: {
      name: "Ishimwe Grace",
      phone: "+250 788890123",
      email: "grace.i@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Gikondo",
    },
    rooms: 2,
    bathrooms: 1,
    maxGuests: 3,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Cozy residence in Gikondo area, accessible to campus.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 12,
    features: ["Study Desk"],
    yearBuilt: 2020,
    totalReviews: 9,
    host: {
      name: "Nshimiye Jean",
      phone: "+250 788901234",
      email: "jean.n@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Kanombe",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student house in Kanombe, peaceful area.",
    amenities: ["WiFi", "Kitchen", "Garden", "Security", "Parking"],
    owner: "Mukeshimana Marie",
    contact: "+250 788012345",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 10,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 14,
    host: {
      name: "Mukeshimana Marie",
      phone: "+250 788012345",
      email: "marie@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabahizi",
      village: "Nyarutarama",
    },
    rooms: 5,
    bathrooms: 3,
    maxGuests: 8,
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
    status: "available",
    minutesFromCampus: 5,
    features: [
      "Solar Panels",
      "Water Heater",
      "Study Desk",
      "Garden",
      "BBQ Area",
    ],
    yearBuilt: 2023,
    totalReviews: 42,
    host: {
      name: "Ndagijimana Francois",
      phone: "+250 788123456",
      email: "francois@example.com",
    },
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
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Cyabararika",
      village: "Cyabararika",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
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
    status: "available",
    minutesFromCampus: 5,
    features: ["Solar Panels", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
    totalReviews: 38,
    host: {
      name: "Ntwari Jean Rene",
      phone: "+250 780414088",
      email: "jean.r@example.com",
    },
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
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Cyabararika",
      village: "Musanze",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
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
    status: "available",
    minutesFromCampus: 8,
    features: ["Water Heater", "Study Desk"],
    yearBuilt: 2021,
    totalReviews: 22,
    host: {
      name: "Rutayisire John",
      phone: "+250 788234567",
      email: "john.r@example.com",
    },
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
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Cyabararika",
      village: "Ruhengeri",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments in Ruhengeri, close to campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Uwimana Jeanne",
    contact: "+250 788345678",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 10,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2020,
    totalReviews: 16,
    host: {
      name: "Uwimana Jeanne",
      phone: "+250 788345678",
      email: "jeanne@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Remera",
      cell: "Amahoro",
      village: "Kigali Heights",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Luxury apartments near UoK campus with modern amenities.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Gym", "Pool"],
    owner: "Mugisha Peter",
    contact: "+250 788456789",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 3,
    features: ["Balcony", "Water Heater", "Study Desk"],
    yearBuilt: 2023,
    totalReviews: 32,
    host: {
      name: "Mugisha Peter",
      phone: "+250 788456789",
      email: "peter.m@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Remera",
      cell: "Amahoro",
      village: "Remera",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Spacious student village in Remera, close to UoK.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Garden"],
    owner: "Niyonshuti Jean",
    contact: "+250 788567890",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 19,
    host: {
      name: "Niyonshuti Jean",
      phone: "+250 788567890",
      email: "jean.n@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Kicukiro",
      sector: "Kicukiro",
      cell: "Kicukiro",
      village: "Kicukiro",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Affordable student house near ULK campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Uwimana Grace",
    contact: "+250 788678901",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
    totalReviews: 14,
    host: {
      name: "Uwimana Grace",
      phone: "+250 788678901",
      email: "grace.u@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Kicukiro",
      sector: "Kicukiro",
      cell: "Kicukiro",
      village: "Kicukiro Heights",
    },
    rooms: 2,
    bathrooms: 1,
    maxGuests: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Comfortable apartments near ULK, ideal for students.",
    amenities: ["WiFi", "Kitchen", "Security"],
    owner: "Mukeshimana Marie",
    contact: "+250 788789012",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Water Heater"],
    yearBuilt: 2020,
    totalReviews: 11,
    host: {
      name: "Mukeshimana Marie",
      phone: "+250 788789012",
      email: "marie.m@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kacyiru",
      cell: "Kacyiru",
      village: "Kacyiru",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Premium student housing near CMU-Africa campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room", "Gym"],
    owner: "Kagame Peter",
    contact: "+250 788890123",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 2,
    features: ["Solar Panels", "Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2023,
    totalReviews: 28,
    host: {
      name: "Kagame Peter",
      phone: "+250 788890123",
      email: "peter.k@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kacyiru",
      cell: "Kacyiru",
      village: "Kacyiru South",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near ALU with collaborative spaces.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Garden"],
    owner: "Rwema Emmanuel",
    contact: "+250 788901234",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 4,
    features: ["Garden", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
    totalReviews: 20,
    host: {
      name: "Rwema Emmanuel",
      phone: "+250 788901234",
      email: "emmanuel.r@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kacyiru",
      cell: "Kacyiru",
      village: "Kacyiru",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Peaceful student village near AUCA campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Garden", "Study Area"],
    owner: "Habimana Jean",
    contact: "+250 788012345",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
    totalReviews: 15,
    host: {
      name: "Habimana Jean",
      phone: "+250 788012345",
      email: "jean.h@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Remera",
      cell: "Kibagabaga",
      village: "Kibagabaga",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Kigali students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area", "Common Room"],
    owner: "Niyonzima Anne",
    contact: "+250 788123456",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 5,
    features: ["Common Room", "Study Desk"],
    yearBuilt: 2020,
    totalReviews: 12,
    host: {
      name: "Niyonzima Anne",
      phone: "+250 788123456",
      email: "anne.n@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kimihurura",
      cell: "Kimihurura",
      village: "Kimihurura",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near Mount Kigali University.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Muhire Emmanuel",
    contact: "+250 788234567",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 18,
    host: {
      name: "Muhire Emmanuel",
      phone: "+250 788234567",
      email: "emmanuel.m@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Huye",
      sector: "Ngoma",
      cell: "Ngoma",
      village: "Huye",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village in Huye, near UR campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788345678",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
    totalReviews: 13,
    host: {
      name: "Nshimiye Jean",
      phone: "+250 788345678",
      email: "jean.n@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Huye",
      sector: "Ngoma",
      cell: "Ngoma",
      village: "Huye",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for IPRC Huye students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Uwera Sarah",
    contact: "+250 788456789",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 8,
    host: {
      name: "Uwera Sarah",
      phone: "+250 788456789",
      email: "sarah.u@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Muhanga",
      sector: "Kabgayi",
      cell: "Kabgayi",
      village: "Kabgayi",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Peaceful residence near ICK Kabgayi.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Habineza James",
    contact: "+250 788567890",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 5,
    features: ["Garden", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 10,
    host: {
      name: "Habineza James",
      phone: "+250 788567890",
      email: "james.h@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Ruhango",
      sector: "Gitwe",
      cell: "Gitwe",
      village: "Gitwe",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near University of Gitwe.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Rukundo Jean",
    contact: "+250 788678901",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Study Desk"],
    yearBuilt: 2020,
    totalReviews: 7,
    host: {
      name: "Rukundo Jean",
      phone: "+250 788678901",
      email: "jean.r@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Nyanza",
      sector: "Nyanza",
      cell: "Nyanza",
      village: "Nyanza",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near Catholic University.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking"],
    owner: "Mugisha David",
    contact: "+250 788789012",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 14,
    host: {
      name: "Mugisha David",
      phone: "+250 788789012",
      email: "david.m@example.com",
    },
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
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Muhoza",
      village: "Muhoza",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Musanze students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Niyomugabo Eric",
    contact: "+250 788890123",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 6,
    host: {
      name: "Niyomugabo Eric",
      phone: "+250 788890123",
      email: "eric.n@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Ngoma",
      sector: "Remera",
      cell: "Remera",
      village: "Ngoma",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near IPRC Ngoma.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Ishimwe Grace",
    contact: "+250 788901234",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2020,
    totalReviews: 5,
    host: {
      name: "Ishimwe Grace",
      phone: "+250 788901234",
      email: "grace.i@example.com",
    },
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
    location: {
      province: "Western",
      district: "Karongi",
      sector: "Bwishyura",
      cell: "Bwishyura",
      village: "Karongi",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Peaceful residence near IPRC Karongi.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Mukeshimana Marie",
    contact: "+250 788012345",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 4,
    host: {
      name: "Mukeshimana Marie",
      phone: "+250 788012345",
      email: "marie.m@example.com",
    },
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
    location: {
      province: "Western",
      district: "Rusizi",
      sector: "Kamembe",
      cell: "Kamembe",
      village: "Rusizi",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Budget-friendly hostel for IPRC Rusizi students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 10,
    features: ["Study Desk"],
    yearBuilt: 2018,
    totalReviews: 3,
    host: {
      name: "Ndagijimana Francois",
      phone: "+250 788123456",
      email: "francois.n@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Nyagatare",
      sector: "Nyagatare",
      cell: "Nyagatare",
      village: "Nyagatare",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student village near UR Nyagatare Campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Rutayisire John",
    contact: "+250 788234567",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2020,
    totalReviews: 6,
    host: {
      name: "Rutayisire John",
      phone: "+250 788234567",
      email: "john.r@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Kayonza",
      sector: "Kayonza",
      cell: "Kayonza",
      village: "Kayonza",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Residence near CAVM, ideal for agriculture students.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Uwimana Jeanne",
    contact: "+250 788345678",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
    totalReviews: 8,
    host: {
      name: "Uwimana Jeanne",
      phone: "+250 788345678",
      email: "jeanne.u@example.com",
    },
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
    location: {
      province: "Northern",
      district: "Rulindo",
      sector: "Tumba",
      cell: "Tumba",
      village: "Tumba",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Affordable hostel for IPRC Tumba students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Nshimiye Jean",
    contact: "+250 788456789",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 4,
    host: {
      name: "Nshimiye Jean",
      phone: "+250 788456789",
      email: "jean.n@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Bugesera",
      sector: "Nyamata",
      cell: "Nyamata",
      village: "Nyamata",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near UGHE campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Garden"],
    owner: "Kagame Peter",
    contact: "+250 788567890",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 5,
    features: ["Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2023,
    totalReviews: 16,
    host: {
      name: "Kagame Peter",
      phone: "+250 788567890",
      email: "peter.k@example.com",
    },
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
    location: {
      province: "Western",
      district: "Nyamasheke",
      sector: "Kibogora",
      cell: "Kibogora",
      village: "Kibogora",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near Kibogora Polytechnic.",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    owner: "Mukamana Alice",
    contact: "+250 788678901",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Study Desk"],
    yearBuilt: 2020,
    totalReviews: 3,
    host: {
      name: "Mukamana Alice",
      phone: "+250 788678901",
      email: "alice.m@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kimironko",
      cell: "Kimironko",
      village: "Kimironko",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near UTAB campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Habimana Jean",
    contact: "+250 788789012",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 9,
    host: {
      name: "Habimana Jean",
      phone: "+250 788789012",
      email: "jean.h@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kacyiru",
      cell: "Kacyiru",
      village: "Kacyiru",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student hostel near UTB, ideal for business students.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Niyonshuti Jean",
    contact: "+250 788890123",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 7,
    features: ["Study Desk"],
    yearBuilt: 2020,
    totalReviews: 5,
    host: {
      name: "Niyonshuti Jean",
      phone: "+250 788890123",
      email: "jean.n@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Kayonza",
      sector: "Rwinkwavu",
      cell: "Rwinkwavu",
      village: "Rwinkwavu",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    description: "Student village near RICA campus.",
    amenities: ["WiFi", "Kitchen", "Garden", "Study Area"],
    owner: "Rukundo Jean",
    contact: "+250 788901234",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Study Desk"],
    yearBuilt: 2021,
    totalReviews: 4,
    host: {
      name: "Rukundo Jean",
      phone: "+250 788901234",
      email: "jean.r@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kimihurura",
      cell: "Kimihurura",
      village: "Kimihurura",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern residence near ILPD, ideal for law students.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Parking"],
    owner: "Mugisha David",
    contact: "+250 788012345",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 5,
    features: ["Water Heater", "Study Desk", "Balcony"],
    yearBuilt: 2022,
    totalReviews: 12,
    host: {
      name: "Mugisha David",
      phone: "+250 788012345",
      email: "david.m@example.com",
    },
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
    location: {
      province: "Eastern",
      district: "Bugesera",
      sector: "Gashora",
      cell: "Gashora",
      village: "Gashora",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student hostel near Rwanda Military Academy.",
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    owner: "Ndagijimana Francois",
    contact: "+250 788123456",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 9,
    features: ["Study Desk"],
    yearBuilt: 2019,
    totalReviews: 3,
    host: {
      name: "Ndagijimana Francois",
      phone: "+250 788123456",
      email: "francois.n@example.com",
    },
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
    location: {
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kacyiru",
      cell: "Kacyiru",
      village: "Kacyiru",
    },
    rooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Modern apartments near JKUAT Rwanda Campus.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room"],
    owner: "Rwema Emmanuel",
    contact: "+250 788234567",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 6,
    features: ["Balcony", "Water Heater"],
    yearBuilt: 2022,
    totalReviews: 10,
    host: {
      name: "Rwema Emmanuel",
      phone: "+250 788234567",
      email: "emmanuel.r@example.com",
    },
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
    location: {
      province: "Southern",
      district: "Huye",
      sector: "Ngoma",
      cell: "Ngoma",
      village: "Huye",
    },
    rooms: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    description: "Student village near UR College of Education.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Area"],
    owner: "Habineza James",
    contact: "+250 788567890",
    bookingStatus: "available",
    status: "available",
    minutesFromCampus: 8,
    features: ["Study Desk", "Water Heater"],
    yearBuilt: 2021,
    totalReviews: 7,
    host: {
      name: "Habineza James",
      phone: "+250 788567890",
      email: "james.h@example.com",
    },
  },
];

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
      label: t.categoryMedium || "Medium (80,001 - 105,000 RWF)",
      range: "80,001 - 105,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-yellow-400 to-amber-500",
      min: 80001,
      max: 105000,
    },
    {
      id: "high",
      label: t.categoryHigh || "High (105,001 - 130,000 RWF)",
      range: "105,001 - 130,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-red-400 to-rose-500",
      min: 105001,
      max: Infinity,
    },
  ];
};

// ============================================================
// SELECTION MODAL
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
// LOGIN/REGISTER MODAL (full version - same as Hero)
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
  const [lang] = useState<"en" | "fr" | "rw">(getLanguageFromCookies());
  const t = translations[lang];
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [isLoginEmailValid, setIsLoginEmailValid] = useState<boolean | null>(
    null,
  );
  const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<
    boolean | null
  >(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginEmailChange = (email: string) => {
    setLoginEmail(email);
    setIsLoginEmailValid(email.length > 0 ? validateEmail(email) : null);
    setLoginError("");
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

  const handlePasswordChange = (password: string) => {
    setRegisterPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
    setRegisterError("");
    setErrorMessage("");
  };

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setSuccess(true);
        toast.success(`✅ ${t.welcomeBack || "Welcome back!"}, ${loginEmail}!`);
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage("Invalid email or password");
        toast.error(`❌ ${t.loginFailed || "Login failed"}`);
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setSuccess(true);
        toast.success(
          `✅ ${t.accountCreated || "Account created!"}, ${registerName}!`,
        );
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage("Registration failed. Please try again.");
        toast.error(`❌ ${t.registerFailed || "Registration failed"}`);
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

  const isLoginFormValid = (): boolean => {
    return (
      loginEmail.length > 0 &&
      validateEmail(loginEmail) &&
      loginPassword.length >= 6
    );
  };

  const isRegisterFormValid = (): boolean => {
    return (
      registerName.length >= 2 &&
      registerEmail.length > 0 &&
      validateEmail(registerEmail) &&
      registerPhone.length > 0 &&
      validatePhone(registerPhone) &&
      registerPassword.length >= 6 &&
      registerPassword === registerConfirmPassword &&
      passwordStrength !== null &&
      passwordStrength !== "weak"
    );
  };

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
    setIsRegisterEmailValid(null);
    setIsPhoneValid(null);
    setPasswordStrength(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccess(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (!isOpen) {
      const timeoutId = window.setTimeout(resetFormState, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen]);

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
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.emailAddress || "Email"}{" "}
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

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password || "Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            setLoginError("");
                          }}
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
                      </div>
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
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.fullNameLabel || "Full Name"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={registerName}
                          onChange={(e) => {
                            setRegisterName(e.target.value);
                            setRegisterError("");
                          }}
                          className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                          disabled={loading}
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.emailAddress || "Email"}{" "}
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
                        {isPhoneValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isPhoneValid === false && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidPhone ||
                            "Please enter a valid phone number"}
                        </p>
                      )}
                    </div>

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
                                    passwordStrength === "weak"
                                      ? "#ef4444"
                                      : passwordStrength === "moderate"
                                        ? "#f59e0b"
                                        : "#22c55e",
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
                                  passwordStrength === "weak"
                                    ? "#ef4444"
                                    : passwordStrength === "moderate"
                                      ? "#f59e0b"
                                      : "#22c55e",
                              }}
                            >
                              {passwordStrength === "weak"
                                ? t.passwordWeak || "Weak"
                                : passwordStrength === "moderate"
                                  ? t.passwordModerate || "Moderate"
                                  : t.passwordStrong || "Strong"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.confirmPassword || "Confirm Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          registerPassword &&
                          registerConfirmPassword &&
                          registerPassword === registerConfirmPassword &&
                          registerConfirmPassword.length > 0
                            ? "border-green-500"
                            : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            registerPassword &&
                            registerConfirmPassword &&
                            registerPassword === registerConfirmPassword &&
                            registerConfirmPassword.length > 0
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerConfirmPassword}
                          onChange={(e) => {
                            setRegisterConfirmPassword(e.target.value);
                            setRegisterError("");
                          }}
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
                        {registerPassword &&
                          registerConfirmPassword &&
                          registerPassword === registerConfirmPassword &&
                          registerConfirmPassword.length > 0 && (
                            <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                      </div>
                      {registerPassword &&
                        registerConfirmPassword &&
                        registerPassword !== registerConfirmPassword &&
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
// MAIN COMPONENT
// ============================================================

export const HouseOnRent: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [houses] = useState<House[]>(MOCK_HOUSES);
  const [filteredHouses, setFilteredHouses] = useState<House[]>(MOCK_HOUSES);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [loading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [maxMinutesFromCampus, setMaxMinutesFromCampus] = useState<number>(60);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);

  // Modal states for selection
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [isCellModalOpen, setIsCellModalOpen] = useState(false);
  const [isVillageModalOpen, setIsVillageModalOpen] = useState(false);
  const [searchModalQuery, setSearchModalQuery] = useState("");

  const priceCategories = getPriceCategories(translations[lang]);
  const [selectedPriceCategory, setSelectedPriceCategory] =
    useState<PriceCategory>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState<
    "login" | "register"
  >("login");

  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>("");

  const [currentStep, setCurrentStep] = useState(1);
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});

  const [step1Touched, setStep1Touched] = useState<Record<string, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    idNumber: false,
    university: false,
    studentId: false,
    purpose: false,
  });
  const [step2Touched, setStep2Touched] = useState<Record<string, boolean>>({
    checkIn: false,
    checkOut: false,
    months: false,
    guests: false,
    specialRequests: false,
  });
  const [step3Touched, setStep3Touched] = useState<Record<string, boolean>>({
    momoNumber: false,
    screenshot: false,
  });

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

  const t = translations[lang];

  const generateBookingReference = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "BK-";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Helper functions for location data
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

  // Get unique universities from houses
  const uniqueUniversities = [...new Set(houses.map((h) => h.university))];

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

  // Filter and sort houses with search
  useEffect(() => {
    let filtered = [...houses];

    // Price category filter
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

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.description.toLowerCase().includes(query) ||
          h.university.toLowerCase().includes(query) ||
          h.location.district.toLowerCase().includes(query) ||
          h.location.sector.toLowerCase().includes(query) ||
          h.location.cell.toLowerCase().includes(query) ||
          h.location.village.toLowerCase().includes(query) ||
          h.location.province.toLowerCase().includes(query),
      );
    }

    // District filter
    if (selectedDistrict) {
      filtered = filtered.filter(
        (h) => h.location.district === selectedDistrict,
      );
    }

    // Sector filter
    if (selectedSector) {
      filtered = filtered.filter((h) => h.location.sector === selectedSector);
    }

    // Cell filter
    if (selectedCell) {
      filtered = filtered.filter((h) => h.location.cell === selectedCell);
    }

    // Village filter
    if (selectedVillage) {
      filtered = filtered.filter((h) => h.location.village === selectedVillage);
    }

    // Price range filter
    if (minPrice > 0) {
      filtered = filtered.filter((h) => h.priceRWF >= minPrice);
    }
    if (maxPrice < 200000) {
      filtered = filtered.filter((h) => h.priceRWF <= maxPrice);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.priceRWF - b.priceRWF);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceRWF - a.priceRWF);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
        break;
      default:
        break;
    }

    setFilteredHouses(filtered);
    setCurrentPage(1);
  }, [
    houses,
    sortBy,
    selectedPriceCategory,
    priceCategories,
    searchQuery,
    selectedDistrict,
    selectedSector,
    selectedCell,
    selectedVillage,
    minPrice,
    maxPrice,
  ]);

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleOrderNow = (house: House) => {
    if (isLoggedIn) {
      openBookingModal(house);
    } else {
      setSelectedHouse(house);
      setLoginRegisterMode("login");
      setIsLoginRegisterOpen(true);
    }
  };

  // Search handler
  const handleSearch = () => {
    toast.info(
      `🔍 Searching: ${searchQuery || selectedDistrict || selectedSector || selectedCell || selectedVillage || "All locations in Rwanda"}`,
    );
    setIsDistrictModalOpen(false);
    setIsSectorModalOpen(false);
    setIsCellModalOpen(false);
    setIsVillageModalOpen(false);
    setIsAdvancedSearchOpen(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPriceCategory("all");
    setSelectedDistrict("");
    setSelectedSector("");
    setSelectedCell("");
    setSelectedVillage("");
    setMinPrice(0);
    setMaxPrice(200000);
    setCurrentPage(1);
    toast.info("🧹 All filters cleared");
  };

  // Booking validation
  const isStep1Valid = (): boolean => {
    const { fullName, email, phone } = bookingData.step1;
    if (!fullName.trim()) return false;
    if (!email.trim() || !validateEmail(email)) return false;
    if (!phone.trim() || !validatePhone(phone)) return false;
    return true;
  };

  const isStep2Valid = (): boolean => {
    const { checkIn, checkOut, months, guests } = bookingData.step2;
    if (!checkIn) return false;
    if (!checkOut) return false;
    if (months < 1) return false;
    if (guests < 1) return false;
    return true;
  };

  const isStep3Valid = (): boolean => {
    const { momoNumber, screenshotPreview } = bookingData.step3;
    if (!momoNumber?.trim() || !validatePhone(momoNumber)) return false;
    if (!screenshotPreview) return false;
    return true;
  };

  const validateStep1Field = (field: string, value: string) => {
    const errors: Record<string, string> = { ...step1Errors };
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

  const validateStep2Field = (field: string, value: any) => {
    const errors: Record<string, string> = { ...step2Errors };
    switch (field) {
      case "checkIn":
        if (!value) errors.checkIn = t.required;
        else delete errors.checkIn;
        break;
      case "checkOut":
        if (!value) errors.checkOut = t.required;
        else delete errors.checkOut;
        break;
      case "months":
        if (!value || value < 1) errors.months = t.required;
        else delete errors.months;
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

  const validateStep3Field = (field: string, value: any) => {
    const errors: Record<string, string> = { ...step3Errors };
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
        delete errors[field];
        break;
    }
    setStep3Errors(errors);
  };

  const handleStep1Change = (
    field: keyof BookingData["step1"],
    value: string,
  ) => {
    setBookingData({
      ...bookingData,
      step1: { ...bookingData.step1, [field]: value },
    });
    setStep1Touched({ ...step1Touched, [field]: true });
    validateStep1Field(field, value);
  };

  const handleStep2Change = (field: keyof BookingData["step2"], value: any) => {
    setBookingData({
      ...bookingData,
      step2: { ...bookingData.step2, [field]: value },
    });
    setStep2Touched({ ...step2Touched, [field]: true });
    validateStep2Field(field, value);
  };

  const handleStep3Change = (field: keyof BookingData["step3"], value: any) => {
    setBookingData({
      ...bookingData,
      step3: { ...bookingData.step3, [field]: value },
    });
    if (field === "momoNumber" || field === "screenshot") {
      setStep3Touched({ ...step3Touched, [field]: true });
    }
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
      const allTouched: Record<string, boolean> = {
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
      const allTouched: Record<string, boolean> = {
        checkIn: true,
        checkOut: true,
        months: true,
        guests: true,
        specialRequests: true,
      };
      setStep2Touched(allTouched);
      validateStep2Field("checkIn", bookingData.step2.checkIn);
      validateStep2Field("checkOut", bookingData.step2.checkOut);
      validateStep2Field("months", bookingData.step2.months);
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
      const allTouched: Record<string, boolean> = {
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
        const isSuccess = Math.random() > 0.3;
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (!isSuccess) {
          throw new Error("Payment processing failed");
        }

        const ref = generateBookingReference();
        setBookingReference(ref);

        const serviceFee = calculateServiceFee(selectedHouse?.priceRWF || 0);

        const orderData = {
          houseId: selectedHouse?.id,
          houseName: selectedHouse?.name,
          monthlyRent: selectedHouse?.priceRWF,
          months: bookingData.step2.months,
          serviceFee: serviceFee,
          totalAmount: serviceFee,
          university: selectedHouse?.university,
          district: selectedHouse?.location.district,
          sector: selectedHouse?.location.sector,
          cell: selectedHouse?.location.cell,
          village: selectedHouse?.location.village,
          checkIn: bookingData.step2.checkIn,
          checkOut: bookingData.step2.checkOut,
          guests: bookingData.step2.guests,
          ...bookingData,
          timestamp: new Date().toISOString(),
        };

        console.log("Booking Data:", orderData);

        setIsBookingModalOpen(false);
        setPaymentCompleted(true);
        setCurrentStep(1);
        setIsSuccessModalOpen(true);
        toast.success(`✅ ${t.bookingSuccess}`);
      } catch (error) {
        console.error("Booking error:", error);
        setIsBookingModalOpen(false);
        setIsFailureModalOpen(true);
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
      months: false,
      guests: false,
      specialRequests: false,
    });
    setStep3Touched({
      momoNumber: false,
      screenshot: false,
    });
  };

  const openBookingModal = (house: House) => {
    setSelectedHouse(house);
    setCurrentStep(1);
    setPaymentCompleted(false);
    setShowContactInfo(false);
    resetBookingData();
    setIsBookingModalOpen(true);
  };

  const openViewModal = (house: House) => {
    setSelectedHouse(house);
    setCurrentImageIndex(0);
    setPaymentCompleted(false);
    setShowContactInfo(false);
    setIsViewModalOpen(true);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "available":
        return t.available;
      case "booked":
        return t.booked;
      case "maintenance":
        return t.maintenance;
      default:
        return status;
    }
  };

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

  const getCategoryCount = (categoryId: PriceCategory) => {
    if (categoryId === "all") return houses.length;
    const category = priceCategories.find((c) => c.id === categoryId);
    if (!category) return 0;
    return houses.filter(
      (h) => h.priceRWF >= category.min && h.priceRWF <= category.max,
    ).length;
  };

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

  const getUssdCode = (): string => {
    const fee = calculateServiceFee(selectedHouse?.priceRWF || 0);
    return `*182*8*1*6377827*${fee}#`;
  };

  // Render field with validation indicators
  const renderField = (
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    placeholder: string,
    type: string = "text",
    error: string = "",
    touched: boolean = false,
    disabled: boolean = false,
  ) => {
    const hasError = touched && error;
    const hasValid = touched && !error && value.trim() !== "";

    return (
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
            hasError
              ? "border-red-500 bg-red-50"
              : hasValid
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
          }`}
        />
        {touched && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <CancelIcon className="w-4 h-4 text-red-500" />
            ) : hasValid ? (
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
        )}
        {hasError && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
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

      {/* Selection Modals for Search */}
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
        searchPlaceholder={t.selectDistrict || "Search districts..."}
        selectedValue={selectedDistrict}
        searchQuery={searchModalQuery}
        setSearchQuery={setSearchModalQuery}
      />

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
        searchQuery={searchModalQuery}
        setSearchQuery={setSearchModalQuery}
      />

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
        searchQuery={searchModalQuery}
        setSearchQuery={setSearchModalQuery}
      />

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
        searchQuery={searchModalQuery}
        setSearchQuery={setSearchModalQuery}
      />

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
                <AutoAwesomeIcon className="w-4 h-4" />
                {t.services}
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.tagline}
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

      {/* Main Content */}
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Search Bar */}
        <div className="relative z-20 mb-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5"
            >
              <div className="flex flex-wrap gap-2">
                {/* District Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsDistrictModalOpen(true);
                      setSearchModalQuery("");
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
                      setSearchModalQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.sector || "Sector"}
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
                      setSearchModalQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.cell || "Cell"}
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
                      setSearchModalQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.village || "Village"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedVillage || t.selectVillage || "Select Village"}
                    </div>
                  </button>
                </div>

                {/* Search Input */}
                <div className="flex-1 min-w-[120px]">
                  <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={t.searchProperties || "Search houses..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF385C] bg-white"
                    />
                  </div>
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
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Sort By */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="text-xs sm:text-sm text-gray-500">
              {filteredHouses.length} {t.results || "results"} found
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none bg-white"
            >
              <option value="popular">{t.mostPopular}</option>
              <option value="price-low">{t.priceLowToHigh}</option>
              <option value="price-high">{t.priceHighToLow}</option>
              <option value="rating">{t.ratingHighToLow}</option>
            </select>
          </div>
        </div>

        {/* Houses Grid with Categories on Right */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Houses Grid - Left Side */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredHouses.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <HomeIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">{t.noHouses}</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {t.adjustFilters}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {paginatedHouses.map((house) => (
                    <motion.div
                      key={house.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                        <img
                          src={house.images[0]}
                          alt={house.name}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openViewModal(house)}
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${getStatusColor(house.status || "available")}`}
                          >
                            {getStatusLabel(house.status || "available")}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <div className="flex items-center gap-1 text-white bg-black/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs">
                            <StarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>
                              {house.rating} ({house.totalReviews || 0})
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs">
                          {house.location.village}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1">
                            {house.name}
                          </h3>
                          <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[80px] sm:max-w-[100px]">
                            {house.university}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2 line-clamp-1">
                          {house.location.village}, {house.location.district}
                        </p>

                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-xs text-gray-500">
                          <span className="flex items-center gap-0.5 sm:gap-1">
                            <BedIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {house.rooms}
                          </span>
                          <span className="flex items-center gap-0.5 sm:gap-1">
                            <PersonIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {house.maxGuests || 4}
                          </span>
                          <span className="flex items-center gap-0.5 sm:gap-1">
                            <BathroomIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {house.bathrooms}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm sm:text-base font-bold text-[#FF385C]">
                              {formatCurrency(house.priceRWF)}
                            </p>
                            <p className="text-[9px] sm:text-xs text-gray-500">
                              {t.perMonth}
                            </p>
                          </div>
                          <button
                            onClick={() => handleOrderNow(house)}
                            disabled={house.status !== "available"}
                            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium transition-colors ${
                              house.status === "available"
                                ? "bg-[#FF385C] text-white hover:bg-[#E31C5F]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {house.status === "available"
                              ? t.bookNow
                              : t.booked}
                          </button>
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
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-400 text-xs sm:text-sm"
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
                      <span className="hidden xs:inline">{t.nextLabel}</span>
                      <ArrowForwardIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Price Categories - Right Side */}
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

      {/* View Details Modal - same as Hero */}
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
            >
              <div className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-xl sm:rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {t.houseDetails}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHouse.images.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedHouse.name} ${index + 1}`}
                        className={`rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                          index === 0
                            ? "col-span-2 h-48 sm:h-56 md:h-64"
                            : "h-24 sm:h-28 md:h-32"
                        }`}
                        onClick={() => openImageModal(index)}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {selectedHouse.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <LocationOnIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {selectedHouse.location.village},{" "}
                      {selectedHouse.location.sector},{" "}
                      {selectedHouse.location.district}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                      <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {selectedHouse.university}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {t.description}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {selectedHouse.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {t.amenities}
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedHouse.amenities.map((amenity: string) => {
                          let icon = null;
                          if (amenity === "WiFi")
                            icon = (
                              <WifiIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            );
                          else if (amenity === "Kitchen")
                            icon = (
                              <KitchenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                            );
                          else if (amenity === "Parking")
                            icon = (
                              <LocalParkingIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                            );
                          else if (amenity === "Security")
                            icon = (
                              <SecurityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            );
                          return (
                            <span
                              key={amenity}
                              className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] sm:text-xs"
                            >
                              {icon}
                              {amenity}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.bedrooms}
                      </label>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {selectedHouse.rooms}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.bathrooms}
                      </label>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {selectedHouse.bathrooms}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.maxGuests}
                      </label>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {selectedHouse.maxGuests || 4}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                      {t.priceDetails}
                    </h4>
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.pricePerMonth}
                      </label>
                      <p className="text-base sm:text-lg font-bold text-[#FF385C]">
                        {formatCurrency(selectedHouse.priceRWF)}
                      </p>
                    </div>
                    <div className="mt-1">
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.serviceFee}
                      </label>
                      <p className="text-sm sm:text-base font-semibold text-[#FF385C]">
                        {formatCurrency(
                          calculateServiceFee(selectedHouse.priceRWF),
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Contact Details - Only shown after payment */}
                  {paymentCompleted && selectedHouse.host && (
                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {t.contactDetails}
                        </h4>
                        <button
                          onClick={() => setShowContactInfo(!showContactInfo)}
                          className="text-xs sm:text-sm text-[#FF385C] font-medium hover:underline"
                        >
                          {showContactInfo ? t.hideContact : t.showContact}
                        </button>
                      </div>
                      {showContactInfo && selectedHouse.host && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 space-y-2">
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">
                              {t.landlordName}:
                            </span>{" "}
                            {selectedHouse.host.name}
                          </p>
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">
                              {t.landlordPhone}:
                            </span>{" "}
                            {selectedHouse.host.phone}
                          </p>
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">
                              {t.landlordEmail}:
                            </span>{" "}
                            {selectedHouse.host.email}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            ✅ {t.paymentComplete} - {t.contactInfoNote}
                          </p>
                        </div>
                      )}
                      {!showContactInfo && (
                        <p className="text-xs sm:text-sm text-gray-500 italic">
                          {t.contactInfoNote}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                    {selectedHouse.status === "available" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsViewModalOpen(false);
                          handleOrderNow(selectedHouse);
                        }}
                        className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t.bookThisHouse}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
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

      {/* Booking Modal - Updated to match Hero with only Service Fee */}
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
            >
              <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-xl sm:rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {t.bookThisHouse}
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
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                    disabled={submitting}
                  >
                    <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                {/* Progress Steps */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium ${
                            currentStep >= step
                              ? "bg-[#FF385C] text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm font-medium text-gray-600 hidden xs:inline">
                          {step === 1 && t.personalInfo}
                          {step === 2 && t.bookingDetails}
                          {step === 3 && t.payment}
                        </span>
                        {step < 3 && (
                          <div
                            className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 ${
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

                <div className="p-4 sm:p-6 space-y-4">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.fullName} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            bookingData.step1.fullName,
                            (e) =>
                              handleStep1Change("fullName", e.target.value),
                            () => {
                              setStep1Touched({
                                ...step1Touched,
                                fullName: true,
                              });
                              validateStep1Field(
                                "fullName",
                                bookingData.step1.fullName,
                              );
                            },
                            "John Doe",
                            "text",
                            step1Errors.fullName || "",
                            step1Touched.fullName,
                            submitting,
                          )}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.email} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            bookingData.step1.email,
                            (e) => handleStep1Change("email", e.target.value),
                            () => {
                              setStep1Touched({ ...step1Touched, email: true });
                              validateStep1Field(
                                "email",
                                bookingData.step1.email,
                              );
                            },
                            "john@example.com",
                            "email",
                            step1Errors.email || "",
                            step1Touched.email,
                            submitting,
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.phone} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            bookingData.step1.phone,
                            (e) => handleStep1Change("phone", e.target.value),
                            () => {
                              setStep1Touched({ ...step1Touched, phone: true });
                              validateStep1Field(
                                "phone",
                                bookingData.step1.phone,
                              );
                            },
                            "+250788123456",
                            "tel",
                            step1Errors.phone || "",
                            step1Touched.phone,
                            submitting,
                          )}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.idNumber}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.idNumber}
                            onChange={(e) =>
                              handleStep1Change("idNumber", e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder="ID123456"
                            disabled={submitting}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.university}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.university}
                            onChange={(e) =>
                              handleStep1Change("university", e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder={t.university}
                            disabled={submitting}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.studentId}
                          </label>
                          <input
                            type="text"
                            value={bookingData.step1.studentId}
                            onChange={(e) =>
                              handleStep1Change("studentId", e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                            placeholder="STU12345"
                            disabled={submitting}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.purpose}
                        </label>
                        <textarea
                          value={bookingData.step1.purpose}
                          onChange={(e) =>
                            handleStep1Change("purpose", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                          placeholder="Study, internship, research..."
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Booking Details - Updated to use Months instead of Nights */}
                  {currentStep === 2 && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.checkIn} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            bookingData.step2.checkIn,
                            (e) => handleStep2Change("checkIn", e.target.value),
                            () => {
                              setStep2Touched({
                                ...step2Touched,
                                checkIn: true,
                              });
                              validateStep2Field(
                                "checkIn",
                                bookingData.step2.checkIn,
                              );
                            },
                            "",
                            "date",
                            step2Errors.checkIn || "",
                            step2Touched.checkIn,
                            submitting,
                          )}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.checkOut} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            bookingData.step2.checkOut,
                            (e) => {
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
                              setStep2Touched({
                                ...step2Touched,
                                checkOut: true,
                              });
                              validateStep2Field("checkOut", checkOut);
                            },
                            () => {
                              setStep2Touched({
                                ...step2Touched,
                                checkOut: true,
                              });
                              validateStep2Field(
                                "checkOut",
                                bookingData.step2.checkOut,
                              );
                            },
                            "",
                            "date",
                            step2Errors.checkOut || "",
                            step2Touched.checkOut,
                            submitting,
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.months} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            String(bookingData.step2.months),
                            (e) =>
                              handleStep2Change(
                                "months",
                                parseInt(e.target.value) || 0,
                              ),
                            () => {
                              setStep2Touched({
                                ...step2Touched,
                                months: true,
                              });
                              validateStep2Field(
                                "months",
                                bookingData.step2.months,
                              );
                            },
                            "1",
                            "number",
                            step2Errors.months || "",
                            step2Touched.months,
                            submitting,
                          )}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.guests} <span className="text-red-500">*</span>
                          </label>
                          {renderField(
                            String(bookingData.step2.guests),
                            (e) =>
                              handleStep2Change(
                                "guests",
                                parseInt(e.target.value) || 0,
                              ),
                            () => {
                              setStep2Touched({
                                ...step2Touched,
                                guests: true,
                              });
                              validateStep2Field(
                                "guests",
                                bookingData.step2.guests,
                              );
                            },
                            "1",
                            "number",
                            step2Errors.guests || "",
                            step2Touched.guests,
                            submitting,
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.specialRequests}
                        </label>
                        <textarea
                          value={bookingData.step2.specialRequests}
                          onChange={(e) =>
                            handleStep2Change("specialRequests", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                          placeholder="Any special requests..."
                          disabled={submitting}
                        />
                      </div>

                      {/* Summary - Only shows Service Fee (matches Hero) */}
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">
                            {t.monthlyRent || "Monthly Rent"}:
                          </span>{" "}
                          {formatCurrency(selectedHouse.priceRWF)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">
                            {t.months || "Months"}:
                          </span>{" "}
                          {bookingData.step2.months}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">{t.serviceFee}:</span>{" "}
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.priceRWF),
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-semibold text-[#FF385C]">
                          <span className="font-medium">{t.totalAmount}:</span>{" "}
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.priceRWF),
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment - Only Service Fee (matches Hero) */}
                  {currentStep === 3 && (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          {t.paymentMethod}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="p-3 sm:p-4 border-2 rounded-lg text-center transition-all bg-[#FF385C]/5 border-[#FF385C]">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-[#FF385C] mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                          </svg>
                          <p className="text-sm sm:text-base font-medium">
                            {t.momo}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t.payWithMomo}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.momoNumber} <span className="text-red-500">*</span>
                        </label>
                        {renderField(
                          bookingData.step3.momoNumber || "",
                          (e) =>
                            handleStep3Change("momoNumber", e.target.value),
                          () => {
                            setStep3Touched({
                              ...step3Touched,
                              momoNumber: true,
                            });
                            validateStep3Field(
                              "momoNumber",
                              bookingData.step3.momoNumber,
                            );
                          },
                          "0788123456",
                          "tel",
                          step3Errors.momoNumber || "",
                          step3Touched.momoNumber,
                          submitting,
                        )}
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm font-medium text-yellow-800">
                          {t.paymentInfo}
                        </p>
                        <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                          {t.momoPaymentInstructions}
                        </p>
                        <div className="mt-2 p-2 sm:p-3 bg-white rounded border border-yellow-200">
                          <div className="text-center">
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">
                              {t.totalAmount || "Total Amount to Pay"}
                            </p>
                            <p className="font-bold text-[#FF385C] text-base sm:text-lg">
                              {formatCurrency(
                                calculateServiceFee(selectedHouse.priceRWF),
                              )}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1 mt-2">
                              {t.ussdCode}
                            </p>
                            <p className="font-mono text-lg sm:text-xl font-bold text-[#FF385C]">
                              {getUssdCode()}
                            </p>
                            <a
                              href={`tel:${getUssdCode().replace(/\*/g, "%2A").replace(/#/g, "%23")}`}
                              className="inline-block mt-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#FF385C] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#E31C5F] transition-colors"
                            >
                              📞 {t.dialNow}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.uploadPaymentProof}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="payment-screenshot"
                            disabled={submitting}
                          />
                          <label
                            htmlFor="payment-screenshot"
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-[10px] sm:text-sm flex items-center gap-1 sm:gap-2 ${
                              step3Touched.screenshot && step3Errors.screenshot
                                ? "border-red-500 bg-red-50"
                                : step3Touched.screenshot &&
                                    bookingData.step3.screenshotPreview
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-300"
                            }`}
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
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
                            {t.chooseFile}
                          </label>
                          {bookingData.step3.screenshotPreview && (
                            <div className="relative">
                              <img
                                src={bookingData.step3.screenshotPreview}
                                alt="Payment Screenshot"
                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200"
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
                                className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                disabled={submitting}
                              >
                                <CancelIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                            </div>
                          )}
                          {step3Touched.screenshot &&
                            step3Errors.screenshot && (
                              <p className="text-xs text-red-500 mt-0.5">
                                {step3Errors.screenshot}
                              </p>
                            )}
                        </div>
                        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                          {t.uploadPaymentProof}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                    {currentStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={prevStep}
                        disabled={submitting}
                        className="px-4 sm:px-6 py-1.5 sm:py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                      >
                        {t.previous}
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
                      className={`flex-1 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
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
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.submitting}
                        </>
                      ) : currentStep === 3 ? (
                        <>
                          <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {t.confirmBooking}
                        </>
                      ) : (
                        t.next
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedHouse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
              onClick={() => setIsImageModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-2 sm:p-4"
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <img
                  src={selectedHouse.images[currentImageIndex]}
                  alt={selectedHouse.name}
                  className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-[10px] sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev > 0 ? prev - 1 : selectedHouse.images.length - 1,
                      )
                    }
                    className="hover:text-[#FF385C] transition-colors"
                  >
                    <ArrowBackIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span>
                    {currentImageIndex + 1} / {selectedHouse.images.length}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev < selectedHouse.images.length - 1 ? prev + 1 : 0,
                      )
                    }
                    className="hover:text-[#FF385C] transition-colors"
                  >
                    <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal - matches Hero */}
      <AnimatePresence>
        {isSuccessModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
              onClick={() => setIsSuccessModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[301] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
            >
              <div className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] lg:max-h-[80vh] xl:max-h-[75vh] 2xl:max-h-[70vh] overflow-y-auto shadow-2xl">
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 text-green-500" />
                  </motion.div>

                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
                    {t.bookingSuccessful}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
                    {t.bookingSuccessfulDesc}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-500">
                      {t.bookingReference}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-mono font-bold text-[#FF385C]">
                      {bookingReference}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-left">
                    <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
                      {t.bookingDetailsSummary}
                    </h4>
                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2.5 xl:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                      <p>
                        <span className="text-gray-500">{t.houseName}:</span>{" "}
                        <span className="font-medium">
                          {selectedHouse.name}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">
                          {t.totalMonths || "Total Months"}:
                        </span>{" "}
                        <span className="font-medium">
                          {bookingData.step2.months}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">{t.totalGuests}:</span>{" "}
                        <span className="font-medium">
                          {bookingData.step2.guests}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">{t.checkInDate}:</span>{" "}
                        <span className="font-medium">
                          {new Date(
                            bookingData.step2.checkIn,
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">{t.checkOutDate}:</span>{" "}
                        <span className="font-medium">
                          {new Date(
                            bookingData.step2.checkOut,
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">{t.amountPaid}:</span>{" "}
                        <span className="font-bold text-[#FF385C]">
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.priceRWF),
                          )}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">
                          {t.paymentMethodUsed}:
                        </span>{" "}
                        <span className="font-medium">{t.momo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsSuccessModalOpen(false);
                        openViewModal(selectedHouse);
                        setPaymentCompleted(true);
                      }}
                      className="flex-1 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                    >
                      {t.viewBookingDetails}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsSuccessModalOpen(false)}
                      className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
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

      {/* Failure Modal */}
      <AnimatePresence>
        {isFailureModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
              onClick={() => setIsFailureModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[301] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="relative p-6 sm:p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
                  >
                    <CancelIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {t.bookingFailedTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    {t.bookingFailedDesc}
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-6 text-left">
                    <p className="text-xs sm:text-sm text-red-700">
                      <span className="font-medium">Error:</span> Unable to
                      process payment. Please check your MOMO number and try
                      again.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsFailureModalOpen(false);
                        openBookingModal(selectedHouse);
                      }}
                      className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-sm sm:text-base"
                    >
                      {t.tryAgain}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsFailureModalOpen(false)}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      {t.goBack}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};