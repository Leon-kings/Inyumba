/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

// // Types
// interface House {
//   id: string;
//   houseId: string;
//   name: string;
//   description: string;
//   images: string[];
//   location: {
//     province: string;
//     district: string;
//     sector: string;
//     cell: string;
//     village: string;
//     coordinates?: {
//       lat: number;
//       lng: number;
//     };
//   };
//   university: string;
//   pricePerNight: number;
//   priceRWF: number;
//   pricePerMonth: number;
//   bedrooms: number;
//   bathrooms: number;
//   maxGuests: number;
//   amenities: string[];
//   status: "available" | "booked" | "maintenance";
//   rating: number;
//   totalReviews: number;
//   host: {
//     name: string;
//     email: string;
//     phone: string;
//     responseRate: number;
//     responseTime: string;
//   };
//   availability: {
//     startDate: string;
//     endDate: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

// interface BookingStep1Data {
//   fullName: string;
//   email: string;
//   phone: string;
//   idNumber: string;
//   university: string;
//   studentId: string;
//   purpose: string;
// }

// interface BookingStep2Data {
//   checkIn: string;
//   checkOut: string;
//   nights: number;
//   guests: number;
//   specialRequests: string;
// }

// interface BookingStep3Data {
//   paymentMethod: "momo" | "cash" | "bank";
//   momoNumber?: string;
//   paymentReference?: string;
//   screenshot?: File | null;
//   screenshotPreview?: string;
// }

// interface BookingData {
//   step1: BookingStep1Data;
//   step2: BookingStep2Data;
//   step3: BookingStep3Data;
// }

// // Translations
// const translations = {
//   en: {
//     findYourHome: "Find Your Perfect Home",
//     searchPlaceholder: "Search by university, district, or village...",
//     filterByUniversity: "Filter by University",
//     allUniversities: "All Universities",
//     filterByDistrict: "Filter by District",
//     allDistricts: "All Districts",
//     filterBySector: "Filter by Sector",
//     allSectors: "All Sectors",
//     filterByVillage: "Filter by Village",
//     allVillages: "All Villages",
//     sortBy: "Sort by",
//     priceLowToHigh: "Price: Low to High",
//     priceHighToLow: "Price: High to Low",
//     ratingHighToLow: "Rating: High to Low",
//     mostPopular: "Most Popular",
//     viewDetails: "View Details",
//     bookNow: "Book Now",
//     available: "Available",
//     booked: "Booked",
//     maintenance: "Under Maintenance",
//     bedrooms: "Bedrooms",
//     bathrooms: "Bathrooms",
//     maxGuests: "Max Guests",
//     perNight: "per night",
//     perMonth: "per month",
//     amenities: "Amenities",
//     location: "Location",
//     hostInfo: "Host Information",
//     responseRate: "Response Rate",
//     responseTime: "Response Time",
//     noHouses: "No houses found",
//     adjustFilters: "Try adjusting your search filters",
//     showing: "Showing",
//     of: "of",
//     results: "results",
//     houseDetails: "House Details",
//     description: "Description",
//     priceDetails: "Price Details",
//     pricePerNight: "Price per Night",
//     pricePerMonth: "Price per Month",
//     bookThisHouse: "Book This House",
//     close: "Close",
//     step: "Step",
//     personalInfo: "Personal Information",
//     bookingDetails: "Booking Details",
//     payment: "Payment",
//     fullName: "Full Name",
//     email: "Email",
//     phone: "Phone",
//     idNumber: "ID Number",
//     university: "University",
//     studentId: "Student ID",
//     purpose: "Purpose of Stay",
//     checkIn: "Check-in Date",
//     checkOut: "Check-out Date",
//     nights: "Nights",
//     guests: "Guests",
//     specialRequests: "Special Requests",
//     paymentMethod: "Payment Method",
//     momo: "MOMO",
//     cash: "Cash",
//     bank: "Bank Transfer",
//     momoNumber: "MOMO Number",
//     paymentReference: "Payment Reference",
//     uploadScreenshot: "Upload Payment Screenshot",
//     chooseFile: "Choose File",
//     totalAmount: "Total Amount",
//     securityDeposit: "Security Deposit",
//     serviceFee: "Service Fee",
//     bookingFee: "Booking Fee",
//     confirmBooking: "Confirm Booking",
//     previous: "Previous",
//     next: "Next",
//     submit: "Submit",
//     submitting: "Submitting...",
//     bookingSuccess: "Booking confirmed successfully!",
//     bookingFailed: "Failed to confirm booking",
//     pleaseFillAllFields: "Please fill in all required fields",
//     paymentInfo: "Payment Information",
//     payWithMomo: "Pay with MOMO",
//     momoPaymentInstructions: "Please send 500 RWF to the number below:",
//     momoNumberDisplay: "0783672782",
//     momoCode: "*182*8*1*6377827*500#",
//     paymentApproval: "Payment Approval",
//     uploadPaymentProof: "Upload your payment confirmation screenshot",
//     sent: "Sent",
//     sending: "Sending...",
//     clickToUpload: "Click to upload screenshot",
//     dragAndDrop: "or drag and drop",
//     viewImage: "View Image",
//     removeImage: "Remove Image",
//     confirmPayment: "Confirm Payment",
//     paymentConfirmed: "Payment confirmed successfully!",
//     paymentFailed: "Payment confirmation failed",
//     cancel: "Cancel",
//   },
//   fr: {
//     findYourHome: "Trouvez Votre Maison Parfaite",
//     searchPlaceholder: "Rechercher par université, district ou village...",
//     filterByUniversity: "Filtrer par Université",
//     allUniversities: "Toutes les Universités",
//     filterByDistrict: "Filtrer par District",
//     allDistricts: "Tous les Districts",
//     filterBySector: "Filtrer par Secteur",
//     allSectors: "Tous les Secteurs",
//     filterByVillage: "Filtrer par Village",
//     allVillages: "Tous les Villages",
//     sortBy: "Trier par",
//     priceLowToHigh: "Prix: Croissant",
//     priceHighToLow: "Prix: Décroissant",
//     ratingHighToLow: "Note: Décroissante",
//     mostPopular: "Les Plus Populaires",
//     viewDetails: "Voir les Détails",
//     bookNow: "Réserver Maintenant",
//     available: "Disponible",
//     booked: "Réservé",
//     maintenance: "En Maintenance",
//     bedrooms: "Chambres",
//     bathrooms: "Salles de Bain",
//     maxGuests: "Max Invités",
//     perNight: "par nuit",
//     perMonth: "par mois",
//     amenities: "Équipements",
//     location: "Emplacement",
//     hostInfo: "Informations sur l'Hôte",
//     responseRate: "Taux de Réponse",
//     responseTime: "Temps de Réponse",
//     noHouses: "Aucune maison trouvée",
//     adjustFilters: "Essayez d'ajuster vos filtres de recherche",
//     showing: "Affichage",
//     of: "de",
//     results: "résultats",
//     houseDetails: "Détails de la Maison",
//     description: "Description",
//     priceDetails: "Détails des Prix",
//     pricePerNight: "Prix par Nuit",
//     pricePerMonth: "Prix par Mois",
//     bookThisHouse: "Réserver Cette Maison",
//     close: "Fermer",
//     step: "Étape",
//     personalInfo: "Informations Personnelles",
//     bookingDetails: "Détails de la Réservation",
//     payment: "Paiement",
//     fullName: "Nom Complet",
//     email: "Email",
//     phone: "Téléphone",
//     idNumber: "Numéro d'Identité",
//     university: "Université",
//     studentId: "ID Étudiant",
//     purpose: "Motif du Séjour",
//     checkIn: "Date d'Arrivée",
//     checkOut: "Date de Départ",
//     nights: "Nuits",
//     guests: "Invités",
//     specialRequests: "Demandes Spéciales",
//     paymentMethod: "Méthode de Paiement",
//     momo: "MOMO",
//     cash: "Espèces",
//     bank: "Virement Bancaire",
//     momoNumber: "Numéro MOMO",
//     paymentReference: "Référence de Paiement",
//     uploadScreenshot: "Télécharger la Capture de Paiement",
//     chooseFile: "Choisir un Fichier",
//     totalAmount: "Montant Total",
//     securityDeposit: "Dépôt de Garantie",
//     serviceFee: "Frais de Service",
//     bookingFee: "Frais de Réservation",
//     confirmBooking: "Confirmer la Réservation",
//     previous: "Précédent",
//     next: "Suivant",
//     submit: "Soumettre",
//     submitting: "Soumission...",
//     bookingSuccess: "Réservation confirmée avec succès !",
//     bookingFailed: "Échec de la confirmation de la réservation",
//     pleaseFillAllFields: "Veuillez remplir tous les champs requis",
//     paymentInfo: "Informations de Paiement",
//     payWithMomo: "Payer avec MOMO",
//     momoPaymentInstructions: "Veuillez envoyer 500 RWF au numéro ci-dessous :",
//     momoNumberDisplay: "0783672782",
//     momoCode: "*182*8*1*6377827*500#",
//     paymentApproval: "Approbation du Paiement",
//     uploadPaymentProof: "Téléchargez votre capture de confirmation de paiement",
//     sent: "Envoyé",
//     sending: "Envoi en cours...",
//     clickToUpload: "Cliquez pour télécharger la capture",
//     dragAndDrop: "ou glissez-déposez",
//     viewImage: "Voir l'Image",
//     removeImage: "Supprimer l'Image",
//     confirmPayment: "Confirmer le Paiement",
//     paymentConfirmed: "Paiement confirmé avec succès !",
//     paymentFailed: "Échec de la confirmation du paiement",
//     cancel: "Annuler",
//   },
//   rw: {
//     findYourHome: "Shaka Inzu Nziza",
//     searchPlaceholder:
//       "Shakisha ukurikije kaminuza, akarere cyangwa umudugudu...",
//     filterByUniversity: "Hitamo Kaminuza",
//     allUniversities: "Kaminuza Zose",
//     filterByDistrict: "Hitamo Akarere",
//     allDistricts: "Uturere Twose",
//     filterBySector: "Hitamo Umurenge",
//     allSectors: "Imirenge Yose",
//     filterByVillage: "Hitamo Umudugudu",
//     allVillages: "Imidugudu Yose",
//     sortBy: "Tondekanya",
//     priceLowToHigh: "Igiciro: Gito kuri Kinini",
//     priceHighToLow: "Igiciro: Kinini kuri Gito",
//     ratingHighToLow: "Amanota: Kinini kuri Gito",
//     mostPopular: "Izikunzwe Cyane",
//     viewDetails: "Reba Ibisobanuro",
//     bookNow: "Kora Booking",
//     available: "Irahari",
//     booked: "Yarakorewe Booking",
//     maintenance: "Iri mu Rwanda",
//     bedrooms: "Ibyumba",
//     bathrooms: "Amazu y'isuku",
//     maxGuests: "Abashyitsi Benshi",
//     perNight: "ku ijoro",
//     perMonth: "ku kwezi",
//     amenities: "Ibikoresho",
//     location: "Aho Gihe",
//     hostInfo: "Amakuru y'Umutambyi",
//     responseRate: "Ugusubiza",
//     responseTime: "Igihe cyo Gusubiza",
//     noHouses: "Nta nzu yabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha",
//     showing: "Bereka",
//     of: "muri",
//     results: "ibisubizo",
//     houseDetails: "Ibisobanuro by'Inzu",
//     description: "Ibisobanuro",
//     priceDetails: "Ibisobanuro by'Igiciro",
//     pricePerNight: "Igiciro ku Ijoro",
//     pricePerMonth: "Igiciro ku Kwezi",
//     bookThisHouse: "Kora Booking ya Inzu",
//     close: "Funga",
//     step: "Intambwe",
//     personalInfo: "Amakuru yawe",
//     bookingDetails: "Amakuru yo gutura",
//     payment: "Kwishyura",
//     fullName: "Izina Ryose",
//     email: "Imeri",
//     phone: "Telefone",
//     idNumber: "Nomero y'Indangamuntu",
//     university: "Kaminuza",
//     studentId: "ID y'Umunyeshuri",
//     purpose: "Impamvu yo Gutura",
//     checkIn: "Itariki yo Kwinjira",
//     checkOut: "Itariki yo Kuva",
//     nights: "Amajoro",
//     guests: "Abashyitsi",
//     specialRequests: "Ibisabwa Bidasanzwe",
//     paymentMethod: "Uburyo bwo Kwishyura",
//     momo: "MOMO",
//     cash: "Amafaranga",
//     bank: "Banki",
//     momoNumber: "Nomero ya MOMO",
//     paymentReference: "Referansi y'Ubwishyu",
//     uploadScreenshot: "Ongeraho Ishusho y'Ubwishyu",
//     chooseFile: "Hitamo Dosive",
//     totalAmount: "Igiciro Cyose",
//     securityDeposit: "Ingwate",
//     serviceFee: "Amahera ya Serivisi",
//     bookingFee: "Amahera ya Booking",
//     confirmBooking: "Emeza Booking",
//     previous: "Inyuma",
//     next: "Ubutaha",
//     submit: "Ohereza",
//     submitting: "Biremereza...",
//     bookingSuccess: "Booking yemejwe neza!",
//     bookingFailed: "Kurema booking birananiranye",
//     pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
//     paymentInfo: "Amakuru y'Ubwishyu",
//     payWithMomo: "Kwishyura ukoresheje MOMO",
//     momoPaymentInstructions: "Ohereza 500 RWF kuri numero ikurikira:",
//     momoNumberDisplay: "0783672782",
//     momoCode: "*182*8*1*6377827*500#",
//     paymentApproval: "Kwemeza Ubwishyu",
//     uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
//     sent: "Yoherejwe",
//     sending: "Biremereza...",
//     clickToUpload: "Kanda kugirango ogeraho ishusho",
//     dragAndDrop: "cyangwa kurura no gushyira",
//     viewImage: "Reba Ishusho",
//     removeImage: "Kuraho Ishusho",
//     confirmPayment: "Emeza Ubwishyu",
//     paymentConfirmed: "Ubwishyu bwemejwe neza!",
//     paymentFailed: "Kwemeza ubwishyu birananiranye",
//     cancel: "Guhagarika",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Mock data - Sample houses based on the document
// const MOCK_HOUSES: House[] = [
//   {
//     id: "1",
//     houseId: "HSE-001",
//     name: "INES Ruhengeri Student Lodge",
//     description:
//       "Modern student accommodation near INES-Ruhengeri. Fully furnished rooms with high-speed internet, study areas, and 24/7 security.",
//     images: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Northern",
//       district: "Musanze",
//       sector: "Muhoza",
//       cell: "Cyabararika",
//       village: "Cyabararika",
//       coordinates: { lat: -1.5, lng: 29.6 },
//     },
//     university: "INES-Ruhengeri",
//     pricePerNight: 85,
//     priceRWF: 110500,
//     pricePerMonth: 2500,
//     bedrooms: 4,
//     bathrooms: 2,
//     maxGuests: 8,
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Parking",
//       "Security",
//       "Study Area",
//       "Laundry",
//       "Hot Water",
//       "TV",
//     ],
//     status: "available",
//     rating: 4.9,
//     totalReviews: 127,
//     host: {
//       name: "Jean Pierre Niyonzima",
//       email: "host@ineslodge.com",
//       phone: "+250788123456",
//       responseRate: 98,
//       responseTime: "2 hours",
//     },
//     availability: {
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//     },
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: "2",
//     houseId: "HSE-002",
//     name: "Kigombe Student Apartments",
//     description:
//       "Spacious apartments located in a quiet neighborhood near INES-Ruhengeri. Perfect for students looking for a peaceful study environment.",
//     images: [
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Northern",
//       district: "Musanze",
//       sector: "Muhoza",
//       cell: "Kigombe",
//       village: "Kigombe",
//       coordinates: { lat: -1.52, lng: 29.62 },
//     },
//     university: "INES-Ruhengeri",
//     pricePerNight: 70,
//     priceRWF: 91000,
//     pricePerMonth: 2100,
//     bedrooms: 3,
//     bathrooms: 2,
//     maxGuests: 6,
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Parking",
//       "Garden",
//       "Furnished",
//       "Hot Water",
//     ],
//     status: "available",
//     rating: 4.5,
//     totalReviews: 89,
//     host: {
//       name: "Marie Claire Uwimana",
//       email: "host@kigombeapart.com",
//       phone: "+250788123457",
//       responseRate: 95,
//       responseTime: "4 hours",
//     },
//     availability: {
//       startDate: "2024-02-01",
//       endDate: "2024-06-30",
//     },
//     createdAt: "2024-01-15T00:00:00Z",
//     updatedAt: "2024-01-15T00:00:00Z",
//   },
//   {
//     id: "3",
//     houseId: "HSE-003",
//     name: "Akinyambo Student Hostel",
//     description:
//       "Affordable student hostel located near UR - CST campus. Great for students looking for budget accommodation close to school.",
//     images: [
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Kigali City",
//       district: "Nyarugenge",
//       sector: "Gitega",
//       cell: "Akabeza",
//       village: "Akinyambo",
//       coordinates: { lat: -1.95, lng: 30.06 },
//     },
//     university: "UR - CST (Science & Tech)",
//     pricePerNight: 50,
//     priceRWF: 65000,
//     pricePerMonth: 1500,
//     bedrooms: 3,
//     bathrooms: 2,
//     maxGuests: 6,
//     amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Hot Water"],
//     status: "booked",
//     rating: 4.2,
//     totalReviews: 56,
//     host: {
//       name: "David Niyonzima",
//       email: "host@akinyambohostel.com",
//       phone: "+250788123458",
//       responseRate: 92,
//       responseTime: "6 hours",
//     },
//     availability: {
//       startDate: "2024-01-20",
//       endDate: "2024-02-20",
//     },
//     createdAt: "2024-01-10T00:00:00Z",
//     updatedAt: "2024-01-12T00:00:00Z",
//   },
//   {
//     id: "4",
//     houseId: "HSE-004",
//     name: "Ruhande Student Flats",
//     description:
//       "Comfortable student flats near UR - Huye Campus. Located in a vibrant student community with easy access to campus facilities.",
//     images: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Southern",
//       district: "Huye",
//       sector: "Ngoma",
//       cell: "Butare",
//       village: "Ruhande",
//       coordinates: { lat: -2.6, lng: 29.75 },
//     },
//     university: "UR - Huye Campus",
//     pricePerNight: 72,
//     priceRWF: 93600,
//     pricePerMonth: 2160,
//     bedrooms: 3,
//     bathrooms: 2,
//     maxGuests: 6,
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Parking",
//       "Study Area",
//       "Garden",
//       "Hot Water",
//     ],
//     status: "available",
//     rating: 4.7,
//     totalReviews: 102,
//     host: {
//       name: "Grace Uwase",
//       email: "host@ruhandeflats.com",
//       phone: "+250788123459",
//       responseRate: 97,
//       responseTime: "3 hours",
//     },
//     availability: {
//       startDate: "2024-03-01",
//       endDate: "2024-04-01",
//     },
//     createdAt: "2024-01-18T00:00:00Z",
//     updatedAt: "2024-01-18T00:00:00Z",
//   },
//   {
//     id: "5",
//     houseId: "HSE-005",
//     name: "Rukara Student Village",
//     description:
//       "Peaceful student village near UR - CE campus. Offers a serene environment perfect for focused study and community living.",
//     images: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Eastern",
//       district: "Rwamagana",
//       sector: "Rukara",
//       cell: "Rukara",
//       village: "Rukara",
//       coordinates: { lat: -2.05, lng: 30.25 },
//     },
//     university: "UR - CE (Education)",
//     pricePerNight: 68,
//     priceRWF: 88400,
//     pricePerMonth: 2040,
//     bedrooms: 3,
//     bathrooms: 2,
//     maxGuests: 6,
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Parking",
//       "Garden",
//       "Study Area",
//       "Laundry",
//     ],
//     status: "available",
//     rating: 4.4,
//     totalReviews: 78,
//     host: {
//       name: "Eric Kamanzi",
//       email: "host@rukaravillage.com",
//       phone: "+250788123460",
//       responseRate: 90,
//       responseTime: "5 hours",
//     },
//     availability: {
//       startDate: "2024-02-10",
//       endDate: "2024-03-10",
//     },
//     createdAt: "2024-01-19T00:00:00Z",
//     updatedAt: "2024-01-19T00:00:00Z",
//   },
//   {
//     id: "6",
//     houseId: "HSE-006",
//     name: "Gisenyi Lake View Apartments",
//     description:
//       "Beautiful apartments with stunning views of Lake Kivu. Located near UTB campus, perfect for tourism and business students.",
//     images: [
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Western",
//       district: "Rubavu",
//       sector: "Gisenyi",
//       cell: "Rubavu",
//       village: "Rubavu",
//       coordinates: { lat: -1.7, lng: 29.25 },
//     },
//     university: "UTB (Tourism & Business)",
//     pricePerNight: 95,
//     priceRWF: 123500,
//     pricePerMonth: 2850,
//     bedrooms: 4,
//     bathrooms: 3,
//     maxGuests: 8,
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Parking",
//       "Lake View",
//       "Furnished",
//       "Hot Water",
//       "TV",
//     ],
//     status: "available",
//     rating: 4.8,
//     totalReviews: 145,
//     host: {
//       name: "Jean Baptiste Habimana",
//       email: "host@lakeview.com",
//       phone: "+250788123461",
//       responseRate: 99,
//       responseTime: "1 hour",
//     },
//     availability: {
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//     },
//     createdAt: "2024-01-05T00:00:00Z",
//     updatedAt: "2024-01-05T00:00:00Z",
//   },
//   {
//     id: "7",
//     houseId: "HSE-007",
//     name: "Karongi Student Residence",
//     description:
//       "Modern student residence near IPRC Karongi. Features comfortable rooms with mountain views and a supportive community atmosphere.",
//     images: [
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Western",
//       district: "Karongi",
//       sector: "Bwishyura",
//       cell: "Nyarusazi",
//       village: "Karongi",
//       coordinates: { lat: -2.0, lng: 29.3 },
//     },
//     university: "IPRC Karongi",
//     pricePerNight: 55,
//     priceRWF: 71500,
//     pricePerMonth: 1650,
//     bedrooms: 2,
//     bathrooms: 1,
//     maxGuests: 4,
//     amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Mountain View"],
//     status: "available",
//     rating: 4.3,
//     totalReviews: 67,
//     host: {
//       name: "Claudine Mukamana",
//       email: "host@karongiresidence.com",
//       phone: "+250788123462",
//       responseRate: 93,
//       responseTime: "4 hours",
//     },
//     availability: {
//       startDate: "2024-02-01",
//       endDate: "2024-07-31",
//     },
//     createdAt: "2024-01-20T00:00:00Z",
//     updatedAt: "2024-01-20T00:00:00Z",
//   },
//   {
//     id: "8",
//     houseId: "HSE-008",
//     name: "Byumba Tech Apartments",
//     description:
//       "Modern apartments designed for tech students at UTAB. High-speed internet and collaborative study spaces included.",
//     images: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
//     ],
//     location: {
//       province: "Northern",
//       district: "Gicumbi",
//       sector: "Byumba",
//       cell: "Nyamabuye",
//       village: "Byumba",
//       coordinates: { lat: -1.65, lng: 30.05 },
//     },
//     university: "Univ. of Tech & Arts (UTAB)",
//     pricePerNight: 65,
//     priceRWF: 84500,
//     pricePerMonth: 1950,
//     bedrooms: 3,
//     bathrooms: 2,
//     maxGuests: 5,
//     amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Hot Water", "TV"],
//     status: "available",
//     rating: 4.6,
//     totalReviews: 93,
//     host: {
//       name: "Patrick Nshimiyimana",
//       email: "host@techapart.com",
//       phone: "+250788123463",
//       responseRate: 96,
//       responseTime: "2 hours",
//     },
//     availability: {
//       startDate: "2024-01-15",
//       endDate: "2024-08-15",
//     },
//     createdAt: "2024-01-12T00:00:00Z",
//     updatedAt: "2024-01-12T00:00:00Z",
//   },
// ];

// export const HouseOnRent: React.FC = () => {
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [houses] = useState<House[]>(MOCK_HOUSES);
//   const [filteredHouses, setFilteredHouses] = useState<House[]>(MOCK_HOUSES);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterUniversity, setFilterUniversity] = useState<string>("all");
//   const [filterDistrict, setFilterDistrict] = useState<string>("all");
//   const [filterSector, setFilterSector] = useState<string>("all");
//   const [filterVillage, setFilterVillage] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<string>("popular");
//   const [loading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Modal states
//   const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Booking steps
//   const [currentStep, setCurrentStep] = useState(1);
//   const [bookingData, setBookingData] = useState<BookingData>({
//     step1: {
//       fullName: "",
//       email: "",
//       phone: "",
//       idNumber: "",
//       university: "",
//       studentId: "",
//       purpose: "",
//     },
//     step2: {
//       checkIn: "",
//       checkOut: "",
//       nights: 1,
//       guests: 1,
//       specialRequests: "",
//     },
//     step3: {
//       paymentMethod: "momo",
//       momoNumber: "",
//       paymentReference: "",
//       screenshot: null,
//       screenshotPreview: "",
//     },
//   });

//   // Filters data
//   const [universities, setUniversities] = useState<string[]>([]);
//   const [districts, setDistricts] = useState<string[]>([]);
//   const [sectors, setSectors] = useState<string[]>([]);
//   const [villages, setVillages] = useState<string[]>([]);

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

//   // Extract filter options from houses
//   useEffect(() => {
//     const uniqueUniversities = Array.from(
//       new Set(houses.map((h) => h.university)),
//     );
//     const uniqueDistricts = Array.from(
//       new Set(houses.map((h) => h.location.district)),
//     );
//     const uniqueSectors = Array.from(
//       new Set(houses.map((h) => h.location.sector)),
//     );
//     const uniqueVillages = Array.from(
//       new Set(houses.map((h) => h.location.village)),
//     );

//     setUniversities(uniqueUniversities);
//     setDistricts(uniqueDistricts);
//     setSectors(uniqueSectors);
//     setVillages(uniqueVillages);
//   }, [houses]);

//   // Filter and sort houses
//   useEffect(() => {
//     let filtered = [...houses];

//     // Search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (h) =>
//           h.name.toLowerCase().includes(term) ||
//           h.university.toLowerCase().includes(term) ||
//           h.location.district.toLowerCase().includes(term) ||
//           h.location.sector.toLowerCase().includes(term) ||
//           h.location.village.toLowerCase().includes(term) ||
//           h.location.cell.toLowerCase().includes(term),
//       );
//     }

//     // University filter
//     if (filterUniversity !== "all") {
//       filtered = filtered.filter((h) => h.university === filterUniversity);
//     }

//     // District filter
//     if (filterDistrict !== "all") {
//       filtered = filtered.filter((h) => h.location.district === filterDistrict);
//     }

//     // Sector filter
//     if (filterSector !== "all") {
//       filtered = filtered.filter((h) => h.location.sector === filterSector);
//     }

//     // Village filter
//     if (filterVillage !== "all") {
//       filtered = filtered.filter((h) => h.location.village === filterVillage);
//     }

//     // Sort
//     switch (sortBy) {
//       case "price-low":
//         filtered.sort((a, b) => a.priceRWF - b.priceRWF);
//         break;
//       case "price-high":
//         filtered.sort((a, b) => b.priceRWF - a.priceRWF);
//         break;
//       case "rating":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case "popular":
//         filtered.sort((a, b) => b.totalReviews - a.totalReviews);
//         break;
//       default:
//         break;
//     }

//     setFilteredHouses(filtered);
//   }, [
//     houses,
//     searchTerm,
//     filterUniversity,
//     filterDistrict,
//     filterSector,
//     filterVillage,
//     sortBy,
//   ]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "booked":
//         return "bg-red-100 text-red-800";
//       case "maintenance":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case "available":
//         return t.available;
//       case "booked":
//         return t.booked;
//       case "maintenance":
//         return t.maintenance;
//       default:
//         return status;
//     }
//   };

//   // Format date

//   const formatCurrency = (amount: number): string => {
//     return `RWF ${amount.toLocaleString()}`;
//   };

//   // Handle file upload for payment screenshot
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size must be less than 5MB");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBookingData({
//         ...bookingData,
//         step3: {
//           ...bookingData.step3,
//           screenshot: file,
//           screenshotPreview: reader.result as string,
//         },
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle booking step navigation
//   const nextStep = () => {
//     if (currentStep === 1) {
//       // Validate step 1
//       if (
//         !bookingData.step1.fullName ||
//         !bookingData.step1.email ||
//         !bookingData.step1.phone
//       ) {
//         toast.warning(t.pleaseFillAllFields);
//         return;
//       }
//     }
//     if (currentStep === 2) {
//       // Validate step 2
//       if (!bookingData.step2.checkIn || !bookingData.step2.checkOut) {
//         toast.warning(t.pleaseFillAllFields);
//         return;
//       }
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Handle booking submission
//   const handleSubmitBooking = async () => {
//     if (currentStep === 3) {
//       // Validate step 3
//       if (!bookingData.step3.paymentMethod) {
//         toast.warning(t.pleaseFillAllFields);
//         return;
//       }

//       setSubmitting(true);
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         // Here you would send the booking data to your API
//         console.log("Booking Data:", {
//           house: selectedHouse,
//           ...bookingData,
//         });

//         toast.success(`✅ ${t.bookingSuccess}`);
//         setIsBookingModalOpen(false);
//         setCurrentStep(1);
//         resetBookingData();
//       } catch (error) {
//         console.error("Booking error:", error);
//         toast.error(`❌ ${t.bookingFailed}`);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };

//   // Reset booking data
//   const resetBookingData = () => {
//     setBookingData({
//       step1: {
//         fullName: "",
//         email: "",
//         phone: "",
//         idNumber: "",
//         university: "",
//         studentId: "",
//         purpose: "",
//       },
//       step2: {
//         checkIn: "",
//         checkOut: "",
//         nights: 1,
//         guests: 1,
//         specialRequests: "",
//       },
//       step3: {
//         paymentMethod: "momo",
//         momoNumber: "",
//         paymentReference: "",
//         screenshot: null,
//         screenshotPreview: "",
//       },
//     });
//   };

//   // Open booking modal
//   const openBookingModal = (house: House) => {
//     setSelectedHouse(house);
//     setCurrentStep(1);
//     resetBookingData();
//     setIsBookingModalOpen(true);
//   };

//   // Open view modal
//   const openViewModal = (house: House) => {
//     setSelectedHouse(house);
//     setCurrentImageIndex(0);
//     setIsViewModalOpen(true);
//   };

//   // Open image modal
//   const openImageModal = (index: number) => {
//     setCurrentImageIndex(index);
//     setIsImageModalOpen(true);
//   };

//   // Handle payment method selection
//   const handlePaymentMethodChange = (method: "momo" | "cash" | "bank") => {
//     setBookingData({
//       ...bookingData,
//       step3: {
//         ...bookingData.step3,
//         paymentMethod: method,
//       },
//     });

//     // Open payment modal if momo is selected
//     if (method === "momo") {
//       setIsPaymentModalOpen(true);
//     }
//   };

//   // Handle payment confirmation
//   const handlePaymentConfirmation = () => {
//     if (!bookingData.step3.screenshotPreview) {
//       toast.warning("Please upload payment screenshot");
//       return;
//     }

//     toast.success(`✅ ${t.paymentConfirmed}`);
//     setIsPaymentModalOpen(false);
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
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <svg
//                 className="w-8 h-8 text-[#FF385C]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//               {t.findYourHome}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {filteredHouses.length} {t.results} {t.of} {houses.length}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterUniversity("all");
//                 setFilterDistrict("all");
//                 setFilterSector("all");
//                 setFilterVillage("all");
//                 setSortBy("popular");
//                 toast.info("Filters cleared!");
//               }}
//               className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
//           <div className="relative">
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               type="text"
//               placeholder={t.searchPlaceholder}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <select
//             value={filterUniversity}
//             onChange={(e) => setFilterUniversity(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//           >
//             <option value="all">{t.allUniversities}</option>
//             {universities.map((uni) => (
//               <option key={uni} value={uni}>
//                 {uni}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filterDistrict}
//             onChange={(e) => setFilterDistrict(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//           >
//             <option value="all">{t.allDistricts}</option>
//             {districts.map((dist) => (
//               <option key={dist} value={dist}>
//                 {dist}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filterSector}
//             onChange={(e) => setFilterSector(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//           >
//             <option value="all">{t.allSectors}</option>
//             {sectors.map((sec) => (
//               <option key={sec} value={sec}>
//                 {sec}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filterVillage}
//             onChange={(e) => setFilterVillage(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//           >
//             <option value="all">{t.allVillages}</option>
//             {villages.map((vil) => (
//               <option key={vil} value={vil}>
//                 {vil}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mt-3 flex justify-end">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//           >
//             <option value="popular">{t.mostPopular}</option>
//             <option value="price-low">{t.priceLowToHigh}</option>
//             <option value="price-high">{t.priceHighToLow}</option>
//             <option value="rating">{t.ratingHighToLow}</option>
//           </select>
//         </div>
//       </div>

//       {/* Houses Grid */}
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : filteredHouses.length === 0 ? (
//         <div className="text-center py-12">
//           <svg
//             className="w-16 h-16 mx-auto text-gray-300 mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//             />
//           </svg>
//           <p className="text-gray-500">{t.noHouses}</p>
//           <p className="text-sm text-gray-400">{t.adjustFilters}</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredHouses.map((house) => (
//             <motion.div
//               key={house.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -4 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               {/* Image */}
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={house.images[0]}
//                   alt={house.name}
//                   className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
//                   onClick={() => openViewModal(house)}
//                 />
//                 <div className="absolute top-2 right-2">
//                   <span
//                     className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
//                   >
//                     {getStatusLabel(house.status)}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-2 left-2 right-2">
//                   <div className="flex items-center gap-1 text-white bg-black/50 rounded-lg px-2 py-1 text-xs">
//                     <svg
//                       className="w-3 h-3"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span>
//                       {house.rating} ({house.totalReviews})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
//                     {house.name}
//                   </h3>
//                   <span className="text-xs text-gray-500">
//                     {house.university}
//                   </span>
//                 </div>

//                 <p className="text-xs text-gray-500 mb-2 line-clamp-1">
//                   {house.location.village}, {house.location.district}
//                 </p>

//                 <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
//                   <span className="flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                       />
//                     </svg>
//                     {house.bedrooms}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                       />
//                     </svg>
//                     {house.maxGuests}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-lg font-bold text-[#FF385C]">
//                       {formatCurrency(house.priceRWF)}
//                     </p>
//                     <p className="text-xs text-gray-500">{t.perNight}</p>
//                   </div>
//                   <button
//                     onClick={() => openBookingModal(house)}
//                     disabled={house.status !== "available"}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       house.status === "available"
//                         ? "bg-[#FF385C] text-white hover:bg-[#E31C5F]"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     {house.status === "available" ? t.bookNow : t.booked}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* View Details Modal */}
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
//               <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-[#FF385C]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                       />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.houseDetails}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Images */}
//                   <div className="grid grid-cols-2 gap-2">
//                     {selectedHouse.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`${selectedHouse.name} ${index + 1}`}
//                         className={`rounded-lg object-cover h-48 cursor-pointer hover:opacity-90 transition-opacity ${index === 0 ? "col-span-2 h-64" : ""}`}
//                         onClick={() => openImageModal(index)}
//                       />
//                     ))}
//                   </div>

//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedHouse.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                       {selectedHouse.location.village},{" "}
//                       {selectedHouse.location.sector},{" "}
//                       {selectedHouse.location.district}
//                     </p>
//                     <p className="text-sm text-gray-500 flex items-center gap-2">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 14l9-5-9-5-9 5 9 5z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
//                         />
//                       </svg>
//                       {selectedHouse.university}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         {t.description}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         {selectedHouse.description}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         {t.amenities}
//                       </h4>
//                       <div className="flex flex-wrap gap-1">
//                         {selectedHouse.amenities.map((amenity) => (
//                           <span
//                             key={amenity}
//                             className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
//                           >
//                             {amenity}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//                     <div>
//                       <label className="text-xs text-gray-500">
//                         {t.bedrooms}
//                       </label>
//                       <p className="text-lg font-semibold text-gray-900">
//                         {selectedHouse.bedrooms}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500">
//                         {t.bathrooms}
//                       </label>
//                       <p className="text-lg font-semibold text-gray-900">
//                         {selectedHouse.bathrooms}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500">
//                         {t.maxGuests}
//                       </label>
//                       <p className="text-lg font-semibold text-gray-900">
//                         {selectedHouse.maxGuests}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-900 mb-3">
//                       {t.priceDetails}
//                     </h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="text-xs text-gray-500">
//                           {t.pricePerNight}
//                         </label>
//                         <p className="text-lg font-bold text-[#FF385C]">
//                           {formatCurrency(selectedHouse.priceRWF)}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs text-gray-500">
//                           {t.pricePerMonth}
//                         </label>
//                         <p className="text-lg font-bold text-[#FF385C]">
//                           {formatCurrency(selectedHouse.pricePerMonth * 1000)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4">
//                     <h4 className="font-semibold text-gray-900 mb-2">
//                       {t.hostInfo}
//                     </h4>
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-lg">
//                         {selectedHouse.host.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {selectedHouse.host.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {selectedHouse.host.phone}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {t.responseRate}: {selectedHouse.host.responseRate}% •{" "}
//                           {t.responseTime}: {selectedHouse.host.responseTime}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
//                     {selectedHouse.status === "available" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsViewModalOpen(false);
//                           openBookingModal(selectedHouse);
//                         }}
//                         className="flex-1 px-6 py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         {t.bookThisHouse}
//                       </motion.button>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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

//       {/* Booking Modal */}
//       <AnimatePresence>
//         {isBookingModalOpen && selectedHouse && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 if (!submitting) {
//                   setIsBookingModalOpen(false);
//                   setCurrentStep(1);
//                   resetBookingData();
//                 }
//               }}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-[#FF385C]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.bookThisHouse}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       if (!submitting) {
//                         setIsBookingModalOpen(false);
//                         setCurrentStep(1);
//                         resetBookingData();
//                       }
//                     }}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                     disabled={submitting}
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 {/* Progress Steps */}
//                 <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     {[1, 2, 3].map((step) => (
//                       <div key={step} className="flex items-center">
//                         <div
//                           className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
//                             currentStep >= step
//                               ? "bg-[#FF385C] text-white"
//                               : "bg-gray-200 text-gray-500"
//                           }`}
//                         >
//                           {step}
//                         </div>
//                         <span className="ml-2 text-sm font-medium text-gray-600 hidden sm:inline">
//                           {step === 1 && t.personalInfo}
//                           {step === 2 && t.bookingDetails}
//                           {step === 3 && t.payment}
//                         </span>
//                         {step < 3 && (
//                           <div
//                             className={`w-12 h-0.5 mx-2 ${currentStep > step ? "bg-[#FF385C]" : "bg-gray-200"}`}
//                           ></div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {/* Step 1: Personal Information */}
//                   {currentStep === 1 && (
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.fullName} *
//                           </label>
//                           <input
//                             type="text"
//                             value={bookingData.step1.fullName}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   fullName: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder="John Doe"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.email} *
//                           </label>
//                           <input
//                             type="email"
//                             value={bookingData.step1.email}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   email: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder="john@example.com"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.phone} *
//                           </label>
//                           <input
//                             type="tel"
//                             value={bookingData.step1.phone}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   phone: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder="+250788123456"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.idNumber}
//                           </label>
//                           <input
//                             type="text"
//                             value={bookingData.step1.idNumber}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   idNumber: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder="ID123456"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.university}
//                           </label>
//                           <input
//                             type="text"
//                             value={bookingData.step1.university}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   university: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder={t.university}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.studentId}
//                           </label>
//                           <input
//                             type="text"
//                             value={bookingData.step1.studentId}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step1: {
//                                   ...bookingData.step1,
//                                   studentId: e.target.value,
//                                 },
//                               })
//                             }
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                             placeholder="STU12345"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.purpose}
//                         </label>
//                         <textarea
//                           value={bookingData.step1.purpose}
//                           onChange={(e) =>
//                             setBookingData({
//                               ...bookingData,
//                               step1: {
//                                 ...bookingData.step1,
//                                 purpose: e.target.value,
//                               },
//                             })
//                           }
//                           rows={2}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                           placeholder="Study, internship, research..."
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Step 2: Booking Details */}
//                   {currentStep === 2 && (
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.checkIn} *
//                           </label>
//                           <input
//                             type="date"
//                             value={bookingData.step2.checkIn}
//                             onChange={(e) => {
//                               const checkIn = e.target.value;
//                               setBookingData({
//                                 ...bookingData,
//                                 step2: { ...bookingData.step2, checkIn },
//                               });
//                             }}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.checkOut} *
//                           </label>
//                           <input
//                             type="date"
//                             value={bookingData.step2.checkOut}
//                             onChange={(e) => {
//                               const checkOut = e.target.value;
//                               const nights =
//                                 bookingData.step2.checkIn && checkOut
//                                   ? Math.ceil(
//                                       (new Date(checkOut).getTime() -
//                                         new Date(
//                                           bookingData.step2.checkIn,
//                                         ).getTime()) /
//                                         (1000 * 60 * 60 * 24),
//                                     )
//                                   : 1;
//                               setBookingData({
//                                 ...bookingData,
//                                 step2: {
//                                   ...bookingData.step2,
//                                   checkOut,
//                                   nights: nights > 0 ? nights : 1,
//                                 },
//                               });
//                             }}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.nights}
//                           </label>
//                           <input
//                             type="number"
//                             value={bookingData.step2.nights}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step2: {
//                                   ...bookingData.step2,
//                                   nights: parseInt(e.target.value) || 1,
//                                 },
//                               })
//                             }
//                             min="1"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.guests}
//                           </label>
//                           <input
//                             type="number"
//                             value={bookingData.step2.guests}
//                             onChange={(e) =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step2: {
//                                   ...bookingData.step2,
//                                   guests: parseInt(e.target.value) || 1,
//                                 },
//                               })
//                             }
//                             min="1"
//                             max={selectedHouse.maxGuests}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.specialRequests}
//                         </label>
//                         <textarea
//                           value={bookingData.step2.specialRequests}
//                           onChange={(e) =>
//                             setBookingData({
//                               ...bookingData,
//                               step2: {
//                                 ...bookingData.step2,
//                                 specialRequests: e.target.value,
//                               },
//                             })
//                           }
//                           rows={3}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                           placeholder="Any special requests..."
//                         />
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Total Nights:</span>{" "}
//                           {bookingData.step2.nights}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Total Price:</span>{" "}
//                           {formatCurrency(
//                             bookingData.step2.nights * selectedHouse.priceRWF,
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Step 3: Payment */}
//                   {currentStep === 3 && (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           {t.paymentMethod} *
//                         </label>
//                         <div className="grid grid-cols-3 gap-3">
//                           <button
//                             onClick={() => handlePaymentMethodChange("momo")}
//                             className={`p-3 border-2 rounded-lg text-center transition-all ${
//                               bookingData.step3.paymentMethod === "momo"
//                                 ? "border-[#FF385C] bg-[#FF385C]/5"
//                                 : "border-gray-200 hover:border-gray-300"
//                             }`}
//                           >
//                             <svg
//                               className="w-8 h-8 mx-auto text-[#FF385C] mb-1"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
//                             </svg>
//                             <p className="text-sm font-medium">{t.momo}</p>
//                           </button>
//                           <button
//                             onClick={() => handlePaymentMethodChange("cash")}
//                             className={`p-3 border-2 rounded-lg text-center transition-all ${
//                               bookingData.step3.paymentMethod === "cash"
//                                 ? "border-[#FF385C] bg-[#FF385C]/5"
//                                 : "border-gray-200 hover:border-gray-300"
//                             }`}
//                           >
//                             <svg
//                               className="w-8 h-8 mx-auto text-gray-600 mb-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                               />
//                             </svg>
//                             <p className="text-sm font-medium">{t.cash}</p>
//                           </button>
//                           <button
//                             onClick={() => handlePaymentMethodChange("bank")}
//                             className={`p-3 border-2 rounded-lg text-center transition-all ${
//                               bookingData.step3.paymentMethod === "bank"
//                                 ? "border-[#FF385C] bg-[#FF385C]/5"
//                                 : "border-gray-200 hover:border-gray-300"
//                             }`}
//                           >
//                             <svg
//                               className="w-8 h-8 mx-auto text-gray-600 mb-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M3 10h18M3 10l4-4m-4 4l4 4m14-4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10m14 0l-4-4m4 4l-4 4"
//                               />
//                             </svg>
//                             <p className="text-sm font-medium">{t.bank}</p>
//                           </button>
//                         </div>
//                       </div>

//                       {bookingData.step3.paymentMethod === "momo" && (
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               {t.momoNumber}
//                             </label>
//                             <input
//                               type="tel"
//                               value={bookingData.step3.momoNumber}
//                               onChange={(e) =>
//                                 setBookingData({
//                                   ...bookingData,
//                                   step3: {
//                                     ...bookingData.step3,
//                                     momoNumber: e.target.value,
//                                   },
//                                 })
//                               }
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                               placeholder="0788123456"
//                             />
//                           </div>
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                             <p className="text-sm font-medium text-yellow-800">
//                               {t.paymentInfo}
//                             </p>
//                             <p className="text-sm text-yellow-700 mt-1">
//                               {t.momoPaymentInstructions}
//                             </p>
//                             <div className="mt-2 p-2 bg-white rounded border border-yellow-200">
//                               <p className="text-center font-mono text-lg font-bold text-[#FF385C]">
//                                 {t.momoNumberDisplay}
//                               </p>
//                               <p className="text-center text-sm text-gray-500 mt-1">
//                                 or dial: {t.momoCode}
//                               </p>
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               {t.uploadPaymentProof}
//                             </label>
//                             <div className="flex items-center gap-4">
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleFileUpload}
//                                 className="hidden"
//                                 id="payment-screenshot"
//                               />
//                               <label
//                                 htmlFor="payment-screenshot"
//                                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm flex items-center gap-2"
//                               >
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                                   />
//                                 </svg>
//                                 {t.chooseFile}
//                               </label>
//                               {bookingData.step3.screenshotPreview && (
//                                 <div className="relative">
//                                   <img
//                                     src={bookingData.step3.screenshotPreview}
//                                     alt="Payment Screenshot"
//                                     className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//                                   />
//                                   <button
//                                     onClick={() =>
//                                       setBookingData({
//                                         ...bookingData,
//                                         step3: {
//                                           ...bookingData.step3,
//                                           screenshot: null,
//                                           screenshotPreview: "",
//                                         },
//                                       })
//                                     }
//                                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
//                                   >
//                                     <svg
//                                       className="w-3 h-3"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       viewBox="0 0 24 24"
//                                     >
//                                       <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                       />
//                                     </svg>
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                             <p className="mt-1 text-xs text-gray-500">
//                               Upload your payment confirmation screenshot
//                             </p>
//                           </div>
//                         </div>
//                       )}

//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">
//                             {t.totalAmount}
//                           </span>
//                           <span className="text-lg font-bold text-[#FF385C]">
//                             {formatCurrency(
//                               bookingData.step2.nights *
//                                 selectedHouse.priceRWF +
//                                 500,
//                             )}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center mt-1">
//                           <span className="text-xs text-gray-500">
//                             {t.bookingFee}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {formatCurrency(500)}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-400 mt-1">
//                           * Booking fee: 500 RWF
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Navigation Buttons */}
//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     {currentStep > 1 && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={prevStep}
//                         disabled={submitting}
//                         className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                       >
//                         {t.previous}
//                       </motion.button>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={
//                         currentStep === 3 ? handleSubmitBooking : nextStep
//                       }
//                       disabled={submitting}
//                       className={`flex-1 px-6 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         submitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.submitting}
//                         </>
//                       ) : currentStep === 3 ? (
//                         <>
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M5 13l4 4L19 7"
//                             />
//                           </svg>
//                           {t.confirmBooking}
//                         </>
//                       ) : (
//                         t.next
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Payment Modal */}
//       <AnimatePresence>
//         {isPaymentModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
//               onClick={() => setIsPaymentModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[201] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-[#FF385C]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.paymentApproval}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsPaymentModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                     <p className="text-sm font-medium text-yellow-800">
//                       {t.paymentInfo}
//                     </p>
//                     <p className="text-sm text-yellow-700 mt-1">
//                       {t.momoPaymentInstructions}
//                     </p>
//                     <div className="mt-2 p-2 bg-white rounded border border-yellow-200">
//                       <p className="text-center font-mono text-lg font-bold text-[#FF385C]">
//                         {t.momoNumberDisplay}
//                       </p>
//                       <p className="text-center text-sm text-gray-500 mt-1">
//                         or dial: {t.momoCode}
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.uploadPaymentProof}
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                         id="payment-screenshot-modal"
//                       />
//                       <label
//                         htmlFor="payment-screenshot-modal"
//                         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm flex items-center gap-2"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         {t.chooseFile}
//                       </label>
//                       {bookingData.step3.screenshotPreview && (
//                         <div className="relative">
//                           <img
//                             src={bookingData.step3.screenshotPreview}
//                             alt="Payment Screenshot"
//                             className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//                           />
//                           <button
//                             onClick={() =>
//                               setBookingData({
//                                 ...bookingData,
//                                 step3: {
//                                   ...bookingData.step3,
//                                   screenshot: null,
//                                   screenshotPreview: "",
//                                 },
//                               })
//                             }
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
//                           >
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M6 18L18 6M6 6l12 12"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       {t.uploadPaymentProof}
//                     </p>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsPaymentModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handlePaymentConfirmation}
//                       disabled={!bookingData.step3.screenshotPreview}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         bookingData.step3.screenshotPreview
//                           ? "bg-[#FF385C] hover:bg-[#E31C5F]"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       {t.confirmPayment}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Image Preview Modal */}
//       <AnimatePresence>
//         {isImageModalOpen && selectedHouse && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
//               onClick={() => setIsImageModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 z-[201] flex items-center justify-center p-4"
//             >
//               <div className="relative max-w-4xl max-h-[90vh]">
//                 <button
//                   onClick={() => setIsImageModalOpen(false)}
//                   className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//                 >
//                   <svg
//                     className="w-8 h-8"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//                 <img
//                   src={selectedHouse.images[currentImageIndex]}
//                   alt={selectedHouse.name}
//                   className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//                 />
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
//                   <button
//                     onClick={() =>
//                       setCurrentImageIndex((prev) =>
//                         prev > 0 ? prev - 1 : selectedHouse.images.length - 1,
//                       )
//                     }
//                     className="hover:text-[#FF385C] transition-colors"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
//                   <span>
//                     {currentImageIndex + 1} / {selectedHouse.images.length}
//                   </span>
//                   <button
//                     onClick={() =>
//                       setCurrentImageIndex((prev) =>
//                         prev < selectedHouse.images.length - 1 ? prev + 1 : 0,
//                       )
//                     }
//                     className="hover:text-[#FF385C] transition-colors"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
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



/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Types
interface House {
  id: string;
  houseId: string;
  name: string;
  description: string;
  images: string[];
  location: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  university: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  status: "available" | "booked" | "maintenance";
  rating: number;
  totalReviews: number;
  host: {
    name: string;
    email: string;
    phone: string;
    responseRate: number;
    responseTime: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

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

// Translations
const translations = {
  en: {
    findYourHome: "Find Your Perfect Home",
    searchPlaceholder: "Search by university, district, or village...",
    filterByUniversity: "Filter by University",
    allUniversities: "All Universities",
    filterByDistrict: "Filter by District",
    allDistricts: "All Districts",
    filterBySector: "Filter by Sector",
    allSectors: "All Sectors",
    filterByVillage: "Filter by Village",
    allVillages: "All Villages",
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
    responseRate: "Response Rate",
    responseTime: "Response Time",
    noHouses: "No houses found",
    adjustFilters: "Try adjusting your search filters",
    showing: "Showing",
    of: "of",
    results: "results",
    houseDetails: "House Details",
    description: "Description",
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
    nights: "Nights",
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
    submit: "Submit",
    submitting: "Submitting...",
    bookingSuccess: "Booking confirmed successfully!",
    bookingFailed: "Failed to confirm booking",
    pleaseFillAllFields: "Please fill in all required fields",
    paymentInfo: "Payment Information",
    payWithMomo: "Pay with MOMO",
    momoPaymentInstructions: "Please pay using the USSD code below:",
    momoNumberDisplay: "0783672782",
    momoCode: "*182*8*1*6377827*500#",
    uploadPaymentProof: "Upload your payment confirmation screenshot",
    sent: "Sent",
    sending: "Sending...",
    clickToUpload: "Click to upload screenshot",
    dragAndDrop: "or drag and drop",
    viewImage: "View Image",
    removeImage: "Remove Image",
    confirmPayment: "Confirm Payment",
    paymentConfirmed: "Payment confirmed successfully!",
    paymentFailed: "Payment confirmation failed",
    cancel: "Cancel",
    paymentAmount: "Payment Amount",
    contactDetails: "Contact Details",
    contactInfoNote: "Contact details will be available after payment confirmation",
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
  },
  fr: {
    findYourHome: "Trouvez Votre Maison Parfaite",
    searchPlaceholder: "Rechercher par université, district ou village...",
    filterByUniversity: "Filtrer par Université",
    allUniversities: "Toutes les Universités",
    filterByDistrict: "Filtrer par District",
    allDistricts: "Tous les Districts",
    filterBySector: "Filtrer par Secteur",
    allSectors: "Tous les Secteurs",
    filterByVillage: "Filtrer par Village",
    allVillages: "Tous les Villages",
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
    responseRate: "Taux de Réponse",
    responseTime: "Temps de Réponse",
    noHouses: "Aucune maison trouvée",
    adjustFilters: "Essayez d'ajuster vos filtres de recherche",
    showing: "Affichage",
    of: "de",
    results: "résultats",
    houseDetails: "Détails de la Maison",
    description: "Description",
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
    nights: "Nuits",
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
    submit: "Soumettre",
    submitting: "Soumission...",
    bookingSuccess: "Réservation confirmée avec succès !",
    bookingFailed: "Échec de la confirmation de la réservation",
    pleaseFillAllFields: "Veuillez remplir tous les champs requis",
    paymentInfo: "Informations de Paiement",
    payWithMomo: "Payer avec MOMO",
    momoPaymentInstructions: "Veuillez payer en utilisant le code USSD ci-dessous :",
    momoNumberDisplay: "0783672782",
    momoCode: "*182*8*1*6377827*500#",
    uploadPaymentProof: "Téléchargez votre capture de confirmation de paiement",
    sent: "Envoyé",
    sending: "Envoi en cours...",
    clickToUpload: "Cliquez pour télécharger la capture",
    dragAndDrop: "ou glissez-déposez",
    viewImage: "Voir l'Image",
    removeImage: "Supprimer l'Image",
    confirmPayment: "Confirmer le Paiement",
    paymentConfirmed: "Paiement confirmé avec succès !",
    paymentFailed: "Échec de la confirmation du paiement",
    cancel: "Annuler",
    paymentAmount: "Montant du Paiement",
    contactDetails: "Coordonnées",
    contactInfoNote: "Les coordonnées seront disponibles après la confirmation du paiement",
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
  },
  rw: {
    findYourHome: "Shaka Inzu Nziza",
    searchPlaceholder: "Shakisha ukurikije kaminuza, akarere cyangwa umudugudu...",
    filterByUniversity: "Hitamo Kaminuza",
    allUniversities: "Kaminuza Zose",
    filterByDistrict: "Hitamo Akarere",
    allDistricts: "Uturere Twose",
    filterBySector: "Hitamo Umurenge",
    allSectors: "Imirenge Yose",
    filterByVillage: "Hitamo Umudugudu",
    allVillages: "Imidugudu Yose",
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
    responseRate: "Ugusubiza",
    responseTime: "Igihe cyo Gusubiza",
    noHouses: "Nta nzu yabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha",
    showing: "Bereka",
    of: "muri",
    results: "ibisubizo",
    houseDetails: "Ibisobanuro by'Inzu",
    description: "Ibisobanuro",
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
    nights: "Amajoro",
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
    submit: "Ohereza",
    submitting: "Biremereza...",
    bookingSuccess: "Booking yemejwe neza!",
    bookingFailed: "Kurema booking birananiranye",
    pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
    paymentInfo: "Amakuru y'Ubwishyu",
    payWithMomo: "Kwishyura ukoresheje MOMO",
    momoPaymentInstructions: "Kwishyura ukoresheje kode ya USSD ikurikira:",
    momoNumberDisplay: "0783672782",
    momoCode: "*182*8*1*6377827*500#",
    uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
    sent: "Yoherejwe",
    sending: "Biremereza...",
    clickToUpload: "Kanda kugirango ogeraho ishusho",
    dragAndDrop: "cyangwa kurura no gushyira",
    viewImage: "Reba Ishusho",
    removeImage: "Kuraho Ishusho",
    confirmPayment: "Emeza Ubwishyu",
    paymentConfirmed: "Ubwishyu bwemejwe neza!",
    paymentFailed: "Kwemeza ubwishyu birananiranye",
    cancel: "Guhagarika",
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
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Mock data - Sample houses
const MOCK_HOUSES: House[] = [
  {
    id: "1",
    houseId: "HSE-001",
    name: "INES Ruhengeri Student Lodge",
    description:
      "Modern student accommodation near INES-Ruhengeri. Fully furnished rooms with high-speed internet, study areas, and 24/7 security.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Cyabararika",
      village: "Cyabararika",
      coordinates: { lat: -1.5, lng: 29.6 },
    },
    university: "INES-Ruhengeri",
    pricePerMonth: 110500,
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 8,
    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Security",
      "Study Area",
      "Laundry",
      "Hot Water",
      "TV",
    ],
    status: "available",
    rating: 4.9,
    totalReviews: 127,
    host: {
      name: "Jean Pierre Niyonzima",
      email: "host@ineslodge.com",
      phone: "+250788123456",
      responseRate: 98,
      responseTime: "2 hours",
    },
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    houseId: "HSE-002",
    name: "Kigombe Student Apartments",
    description:
      "Spacious apartments located in a quiet neighborhood near INES-Ruhengeri. Perfect for students looking for a peaceful study environment.",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Northern",
      district: "Musanze",
      sector: "Muhoza",
      cell: "Kigombe",
      village: "Kigombe",
      coordinates: { lat: -1.52, lng: 29.62 },
    },
    university: "INES-Ruhengeri",
    pricePerMonth: 91000,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Garden",
      "Furnished",
      "Hot Water",
    ],
    status: "available",
    rating: 4.5,
    totalReviews: 89,
    host: {
      name: "Marie Claire Uwimana",
      email: "host@kigombeapart.com",
      phone: "+250788123457",
      responseRate: 95,
      responseTime: "4 hours",
    },
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-06-30",
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    houseId: "HSE-003",
    name: "Akinyambo Student Hostel",
    description:
      "Affordable student hostel located near UR - CST campus. Great for students looking for budget accommodation close to school.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Gitega",
      cell: "Akabeza",
      village: "Akinyambo",
      coordinates: { lat: -1.95, lng: 30.06 },
    },
    university: "UR - CST (Science & Tech)",
    pricePerMonth: 65000,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Hot Water"],
    status: "booked",
    rating: 4.2,
    totalReviews: 56,
    host: {
      name: "David Niyonzima",
      email: "host@akinyambohostel.com",
      phone: "+250788123458",
      responseRate: 92,
      responseTime: "6 hours",
    },
    availability: {
      startDate: "2024-01-20",
      endDate: "2024-02-20",
    },
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "4",
    houseId: "HSE-004",
    name: "Ruhande Student Flats",
    description:
      "Comfortable student flats near UR - Huye Campus. Located in a vibrant student community with easy access to campus facilities.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Southern",
      district: "Huye",
      sector: "Ngoma",
      cell: "Butare",
      village: "Ruhande",
      coordinates: { lat: -2.6, lng: 29.75 },
    },
    university: "UR - Huye Campus",
    pricePerMonth: 93600,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Study Area",
      "Garden",
      "Hot Water",
    ],
    status: "available",
    rating: 4.7,
    totalReviews: 102,
    host: {
      name: "Grace Uwase",
      email: "host@ruhandeflats.com",
      phone: "+250788123459",
      responseRate: 97,
      responseTime: "3 hours",
    },
    availability: {
      startDate: "2024-03-01",
      endDate: "2024-04-01",
    },
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
  },
  {
    id: "5",
    houseId: "HSE-005",
    name: "Rukara Student Village",
    description:
      "Peaceful student village near UR - CE campus. Offers a serene environment perfect for focused study and community living.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Eastern",
      district: "Rwamagana",
      sector: "Rukara",
      cell: "Rukara",
      village: "Rukara",
      coordinates: { lat: -2.05, lng: 30.25 },
    },
    university: "UR - CE (Education)",
    pricePerMonth: 88400,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Garden",
      "Study Area",
      "Laundry",
    ],
    status: "available",
    rating: 4.4,
    totalReviews: 78,
    host: {
      name: "Eric Kamanzi",
      email: "host@rukaravillage.com",
      phone: "+250788123460",
      responseRate: 90,
      responseTime: "5 hours",
    },
    availability: {
      startDate: "2024-02-10",
      endDate: "2024-03-10",
    },
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
  },
  {
    id: "6",
    houseId: "HSE-006",
    name: "Gisenyi Lake View Apartments",
    description:
      "Beautiful apartments with stunning views of Lake Kivu. Located near UTB campus, perfect for tourism and business students.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Western",
      district: "Rubavu",
      sector: "Gisenyi",
      cell: "Rubavu",
      village: "Rubavu",
      coordinates: { lat: -1.7, lng: 29.25 },
    },
    university: "UTB (Tourism & Business)",
    pricePerMonth: 123500,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Lake View",
      "Furnished",
      "Hot Water",
      "TV",
    ],
    status: "available",
    rating: 4.8,
    totalReviews: 145,
    host: {
      name: "Jean Baptiste Habimana",
      email: "host@lakeview.com",
      phone: "+250788123461",
      responseRate: 99,
      responseTime: "1 hour",
    },
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "7",
    houseId: "HSE-007",
    name: "Karongi Student Residence",
    description:
      "Modern student residence near IPRC Karongi. Features comfortable rooms with mountain views and a supportive community atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Western",
      district: "Karongi",
      sector: "Bwishyura",
      cell: "Nyarusazi",
      village: "Karongi",
      coordinates: { lat: -2.0, lng: 29.3 },
    },
    university: "IPRC Karongi",
    pricePerMonth: 71500,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Mountain View"],
    status: "available",
    rating: 4.3,
    totalReviews: 67,
    host: {
      name: "Claudine Mukamana",
      email: "host@karongiresidence.com",
      phone: "+250788123462",
      responseRate: 93,
      responseTime: "4 hours",
    },
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-07-31",
    },
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "8",
    houseId: "HSE-008",
    name: "Byumba Tech Apartments",
    description:
      "Modern apartments designed for tech students at UTAB. High-speed internet and collaborative study spaces included.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    ],
    location: {
      province: "Northern",
      district: "Gicumbi",
      sector: "Byumba",
      cell: "Nyamabuye",
      village: "Byumba",
      coordinates: { lat: -1.65, lng: 30.05 },
    },
    university: "Univ. of Tech & Arts (UTAB)",
    pricePerMonth: 84500,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    amenities: ["WiFi", "Kitchen", "Parking", "Study Area", "Hot Water", "TV"],
    status: "available",
    rating: 4.6,
    totalReviews: 93,
    host: {
      name: "Patrick Nshimiyimana",
      email: "host@techapart.com",
      phone: "+250788123463",
      responseRate: 96,
      responseTime: "2 hours",
    },
    availability: {
      startDate: "2024-01-15",
      endDate: "2024-08-15",
    },
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
];

export const HouseOnRent: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [houses] = useState<House[]>(MOCK_HOUSES);
  const [filteredHouses, setFilteredHouses] = useState<House[]>(MOCK_HOUSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUniversity, setFilterUniversity] = useState<string>("all");
  const [filterDistrict, setFilterDistrict] = useState<string>("all");
  const [filterSector, setFilterSector] = useState<string>("all");
  const [filterVillage, setFilterVillage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [loading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Modal states
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Booking steps
  const [currentStep, setCurrentStep] = useState(1);
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

  // Filters data
  const [universities, setUniversities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [villages, setVillages] = useState<string[]>([]);

  const t = translations[lang];

  // Calculate service fee (5% of monthly rent)
  const calculateServiceFee = (monthlyRent: number): number => {
    return Math.round(monthlyRent * 0.05);
  };

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

  // Extract filter options from houses
  useEffect(() => {
    const uniqueUniversities = Array.from(
      new Set(houses.map((h) => h.university)),
    );
    const uniqueDistricts = Array.from(
      new Set(houses.map((h) => h.location.district)),
    );
    const uniqueSectors = Array.from(
      new Set(houses.map((h) => h.location.sector)),
    );
    const uniqueVillages = Array.from(
      new Set(houses.map((h) => h.location.village)),
    );

    setUniversities(uniqueUniversities);
    setDistricts(uniqueDistricts);
    setSectors(uniqueSectors);
    setVillages(uniqueVillages);
  }, [houses]);

  // Filter and sort houses
  useEffect(() => {
    let filtered = [...houses];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.university.toLowerCase().includes(term) ||
          h.location.district.toLowerCase().includes(term) ||
          h.location.sector.toLowerCase().includes(term) ||
          h.location.village.toLowerCase().includes(term) ||
          h.location.cell.toLowerCase().includes(term),
      );
    }

    if (filterUniversity !== "all") {
      filtered = filtered.filter((h) => h.university === filterUniversity);
    }

    if (filterDistrict !== "all") {
      filtered = filtered.filter((h) => h.location.district === filterDistrict);
    }

    if (filterSector !== "all") {
      filtered = filtered.filter((h) => h.location.sector === filterSector);
    }

    if (filterVillage !== "all") {
      filtered = filtered.filter((h) => h.location.village === filterVillage);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
      default:
        break;
    }

    setFilteredHouses(filtered);
  }, [
    houses,
    searchTerm,
    filterUniversity,
    filterDistrict,
    filterSector,
    filterVillage,
    sortBy,
  ]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^(\+250|0)?[7-9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
  };

  // Check if step1 is valid
  const isStep1Valid = (): boolean => {
    const { fullName, email, phone } = bookingData.step1;
    if (!fullName.trim()) return false;
    if (!email.trim() || !validateEmail(email)) return false;
    if (!phone.trim() || !validatePhone(phone)) return false;
    return true;
  };

  // Check if step2 is valid
  const isStep2Valid = (): boolean => {
    const { checkIn, checkOut, nights, guests } = bookingData.step2;
    if (!checkIn) return false;
    if (!checkOut) return false;
    if (nights < 1) return false;
    if (guests < 1) return false;
    return true;
  };

  // Check if step3 is valid
  const isStep3Valid = (): boolean => {
    const { momoNumber, screenshotPreview } = bookingData.step3;
    if (!momoNumber?.trim() || !validatePhone(momoNumber)) return false;
    if (!screenshotPreview) return false;
    return true;
  };

  // Validate step1 on blur
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

  // Validate step2 on blur
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

  // Validate step3 on blur
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
        delete errors[field];
        break;
    }
    setStep3Errors(errors);
  };

  // Handle input change with validation
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

    if (field === "momoNumber" || field === "screenshot") {
      setStep3Touched({ ...step3Touched, [field]: true });
    }

    if (field === "momoNumber") {
      validateStep3Field("momoNumber", value);
    }
  };

  // Handle file upload for payment screenshot
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

  // Handle booking step navigation
  const nextStep = () => {
    if (currentStep === 1) {
      // Mark all fields as touched
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
      
      // Validate all fields
      validateStep1Field("fullName", bookingData.step1.fullName);
      validateStep1Field("email", bookingData.step1.email);
      validateStep1Field("phone", bookingData.step1.phone);
      
      if (!isStep1Valid()) {
        toast.warning(t.pleaseFillAllFields);
        return;
      }
    }
    if (currentStep === 2) {
      // Mark all fields as touched
      const allTouched: Step2Touched = {
        checkIn: true,
        checkOut: true,
        nights: true,
        guests: true,
        specialRequests: true,
      };
      setStep2Touched(allTouched);
      
      // Validate all fields
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

  // Handle booking submission
  const handleSubmitBooking = async () => {
    if (currentStep === 3) {
      // Mark all fields as touched
      const allTouched: Step3Touched = {
        momoNumber: true,
        screenshot: true,
      };
      setStep3Touched(allTouched);
      
      // Validate all fields
      validateStep3Field("momoNumber", bookingData.step3.momoNumber);
      validateStep3Field("screenshot", bookingData.step3.screenshotPreview);
      
      if (!isStep3Valid()) {
        toast.warning(t.pleaseFillAllFields);
        return;
      }

      setSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Booking Data:", {
          house: selectedHouse,
          serviceFee: calculateServiceFee(selectedHouse?.pricePerMonth || 0),
          ...bookingData,
        });

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

  // Reset booking data
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

  // Open booking modal
  const openBookingModal = (house: House) => {
    setSelectedHouse(house);
    setCurrentStep(1);
    setPaymentCompleted(false);
    setShowContactInfo(false);
    resetBookingData();
    setIsBookingModalOpen(true);
  };

  // Open view modal
  const openViewModal = (house: House) => {
    setSelectedHouse(house);
    setCurrentImageIndex(0);
    setPaymentCompleted(false);
    setShowContactInfo(false);
    setIsViewModalOpen(true);
  };

  // Open image modal
  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  // Get status badge color
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

  // Get status label
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

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `RWF ${amount.toLocaleString()}`;
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

  // Helper function to check field validity

  // Render field with validation icons
  const renderStep1Field = (
    field: keyof BookingStep1Data,
    label: string,
    type: string,
    placeholder: string,
    required: boolean = true
  ) => {
    const value = bookingData.step1[field];
    const error = step1Errors[field as keyof Step1Errors];
    const touched = step1Touched[field as keyof Step1Touched];
    const hasError = touched && error;
    const hasValid = touched && !error && value && value.toString().trim() !== "";

    return (
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
          {label} {required && "*"}
        </label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => handleStep1Change(field, e.target.value)}
            onBlur={() => {
              setStep1Touched({ ...step1Touched, [field]: true });
              validateStep1Field(field, value);
            }}
            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
              hasError
                ? "border-red-500 bg-red-50"
                : hasValid
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            placeholder={placeholder}
          />
          {touched && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {hasError ? (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : hasValid ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        )}
      </div>
    );
  };

  // Render Step 2 field
  const renderStep2Field = (
    field: keyof BookingStep2Data,
    label: string,
    type: string,
    placeholder: string = "",
    required: boolean = true
  ) => {
    const value = bookingData.step2[field];
    const error = step2Errors[field as keyof Step2Errors];
    const touched = step2Touched[field as keyof Step2Touched];
    const hasError = touched && error;
    const hasValid = touched && !error && value && value.toString().trim() !== "";

    return (
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
          {label} {required && "*"}
        </label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => {
              const val = type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
              handleStep2Change(field, val);
            }}
            onBlur={() => {
              setStep2Touched({ ...step2Touched, [field]: true });
              validateStep2Field(field, value);
            }}
            min={type === "number" ? 1 : undefined}
            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
              hasError
                ? "border-red-500 bg-red-50"
                : hasValid
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            placeholder={placeholder}
          />
          {touched && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {hasError ? (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : hasValid ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#FF385C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {t.findYourHome}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {filteredHouses.length} {t.results} {t.of} {houses.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterUniversity("all");
                setFilterDistrict("all");
                setFilterSector("all");
                setFilterVillage("all");
                setSortBy("popular");
                toast.info("Filters cleared!");
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterUniversity}
            onChange={(e) => setFilterUniversity(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none bg-white"
          >
            <option value="all">{t.allUniversities}</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none bg-white"
          >
            <option value="all">{t.allDistricts}</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none bg-white"
          >
            <option value="all">{t.allSectors}</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
          <select
            value={filterVillage}
            onChange={(e) => setFilterVillage(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none bg-white"
          >
            <option value="all">{t.allVillages}</option>
            {villages.map((vil) => (
              <option key={vil} value={vil}>
                {vil}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 sm:mt-3 flex justify-end">
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

      {/* Houses Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredHouses.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p className="text-gray-500">{t.noHouses}</p>
          <p className="text-xs sm:text-sm text-gray-400">{t.adjustFilters}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredHouses.map((house) => (
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
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
                  >
                    {getStatusLabel(house.status)}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1 text-white bg-black/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>
                      {house.rating} ({house.totalReviews})
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
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {house.bedrooms}
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {house.maxGuests}
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    {house.bathrooms}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[#FF385C]">
                      {formatCurrency(house.pricePerMonth)}
                    </p>
                    <p className="text-[9px] sm:text-xs text-gray-500">
                      {t.perMonth}
                    </p>
                  </div>
                  <button
                    onClick={() => openBookingModal(house)}
                    disabled={house.status !== "available"}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium transition-colors ${
                      house.status === "available"
                        ? "bg-[#FF385C] text-white hover:bg-[#E31C5F]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {house.status === "available" ? t.bookNow : t.booked}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
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
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHouse.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedHouse.name} ${index + 1}`}
                        className={`rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                          index === 0 ? "col-span-2 h-48 sm:h-56 md:h-64" : "h-24 sm:h-28 md:h-32"
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {selectedHouse.location.village},{" "}
                      {selectedHouse.location.sector},{" "}
                      {selectedHouse.location.district}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
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
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
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
                        {selectedHouse.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] sm:text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500">
                        {t.bedrooms}
                      </label>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {selectedHouse.bedrooms}
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
                        {selectedHouse.maxGuests}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                      {t.priceDetails}
                    </h4>
                    <div>
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500">
                          {t.pricePerMonth}
                        </label>
                        <p className="text-base sm:text-lg font-bold text-[#FF385C]">
                          {formatCurrency(selectedHouse.pricePerMonth)}
                        </p>
                      </div>
                      <div className="mt-1">
                        <label className="text-[10px] sm:text-xs text-gray-500">
                          {t.serviceFee}
                        </label>
                        <p className="text-sm sm:text-base font-semibold text-[#FF385C]">
                          {formatCurrency(calculateServiceFee(selectedHouse.pricePerMonth))}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details - Only shown after payment completion */}
                  {paymentCompleted && (
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
                      {showContactInfo && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 space-y-2">
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">{t.landlordName}:</span>{" "}
                            {selectedHouse.host.name}
                          </p>
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">{t.landlordPhone}:</span>{" "}
                            {selectedHouse.host.phone}
                          </p>
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">{t.landlordEmail}:</span>{" "}
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
                          openBookingModal(selectedHouse);
                        }}
                        className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
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

      {/* Booking Modal */}
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
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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
                            className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 ${currentStep > step ? "bg-[#FF385C]" : "bg-gray-200"}`}
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
                        {renderStep1Field("fullName", t.fullName, "text", "John Doe")}
                        {renderStep1Field("email", t.email, "email", "john@example.com")}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {renderStep1Field("phone", t.phone, "tel", "+250788123456")}
                        {renderStep1Field("idNumber", t.idNumber, "text", "ID123456", false)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {renderStep1Field("university", t.university, "text", t.university, false)}
                        {renderStep1Field("studentId", t.studentId, "text", "STU12345", false)}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.purpose}
                        </label>
                        <textarea
                          value={bookingData.step1.purpose}
                          onChange={(e) => handleStep1Change("purpose", e.target.value)}
                          onBlur={() => {
                            setStep1Touched({ ...step1Touched, purpose: true });
                            validateStep1Field("purpose", bookingData.step1.purpose);
                          }}
                          rows={2}
                          className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none transition-colors ${
                            step1Touched.purpose && step1Errors.purpose
                              ? "border-red-500 bg-red-50"
                              : step1Touched.purpose && bookingData.step1.purpose.trim() !== ""
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Study, internship, research..."
                        />
                        {step1Touched.purpose && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {step1Errors.purpose ? (
                              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ) : bookingData.step1.purpose.trim() !== "" ? (
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : null}
                          </div>
                        )}
                        {step1Touched.purpose && step1Errors.purpose && (
                          <p className="text-xs text-red-500 mt-0.5">{step1Errors.purpose}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Booking Details */}
                  {currentStep === 2 && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {renderStep2Field("checkIn", t.checkIn, "date")}
                        {renderStep2Field("checkOut", t.checkOut, "date")}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {renderStep2Field("nights", t.nights, "number", "1")}
                        {renderStep2Field("guests", t.guests, "number", "1")}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                          {t.specialRequests}
                        </label>
                        <textarea
                          value={bookingData.step2.specialRequests}
                          onChange={(e) => handleStep2Change("specialRequests", e.target.value)}
                          rows={2}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                          placeholder="Any special requests..."
                        />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Total Nights:</span>{" "}
                          {bookingData.step2.nights}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Total Price:</span>{" "}
                          {formatCurrency(
                            bookingData.step2.nights * selectedHouse.pricePerMonth,
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">{t.serviceFee}:</span>{" "}
                          {formatCurrency(
                            calculateServiceFee(selectedHouse.pricePerMonth),
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment - Only MOMO available */}
                  {currentStep === 3 && (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          {t.paymentMethod} *
                        </label>
                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                          <div
                            className="p-3 sm:p-4 border-2 rounded-lg text-center transition-all bg-[#FF385C]/5 border-[#FF385C]"
                          >
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
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="mb-3 sm:mb-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.momoNumber} *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bookingData.step3.momoNumber || ""}
                              onChange={(e) => handleStep3Change("momoNumber", e.target.value)}
                              onBlur={() => {
                                setStep3Touched({ ...step3Touched, momoNumber: true });
                                validateStep3Field("momoNumber", bookingData.step3.momoNumber);
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition-colors ${
                                step3Touched.momoNumber && step3Errors.momoNumber
                                  ? "border-red-500 bg-red-50"
                                  : step3Touched.momoNumber && bookingData.step3.momoNumber && validatePhone(bookingData.step3.momoNumber)
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-300"
                              }`}
                              placeholder="0788123456"
                            />
                            {step3Touched.momoNumber && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {step3Errors.momoNumber ? (
                                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                ) : bookingData.step3.momoNumber && validatePhone(bookingData.step3.momoNumber) ? (
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step3Touched.momoNumber && step3Errors.momoNumber && (
                            <p className="text-xs text-red-500 mt-0.5">{step3Errors.momoNumber}</p>
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
                                {t.paymentAmount}
                              </p>
                              <p className="font-bold text-[#FF385C] text-base sm:text-lg">
                                {formatCurrency(calculateServiceFee(selectedHouse.pricePerMonth))}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1 mt-2">
                                {t.ussdCode}
                              </p>
                              <p className="font-mono text-lg sm:text-xl font-bold text-[#FF385C]">
                                {t.momoCode}
                              </p>
                              <a
                                href={`tel:${t.momoCode.replace(/\*/g, '%2A').replace(/#/g, '%23')}`}
                                className="inline-block mt-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#FF385C] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#E31C5F] transition-colors"
                              >
                                📞 {t.dialNow}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 sm:mb-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.uploadPaymentProof} *
                          </label>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="payment-screenshot"
                            />
                            <label
                              htmlFor="payment-screenshot"
                              className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-[10px] sm:text-sm flex items-center gap-1 sm:gap-2 ${
                                step3Touched.screenshot && step3Errors.screenshot
                                  ? "border-red-500 bg-red-50"
                                  : step3Touched.screenshot && bookingData.step3.screenshotPreview
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
                                    setStep3Touched({ ...step3Touched, screenshot: true });
                                    validateStep3Field("screenshot", "");
                                  }}
                                  className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                  <svg
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                ) : bookingData.step3.screenshotPreview ? (
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : null}
                              </div>
                            )}
                          </div>
                          {step3Touched.screenshot && step3Errors.screenshot && (
                            <p className="text-xs text-red-500 mt-0.5">{step3Errors.screenshot}</p>
                          )}
                          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                            {t.uploadPaymentProof}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {t.totalAmount}
                          </span>
                          <span className="text-base sm:text-lg font-bold text-[#FF385C]">
                            {formatCurrency(
                              bookingData.step2.nights * selectedHouse.pricePerMonth,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5 sm:mt-1">
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {t.serviceFee}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {formatCurrency(calculateServiceFee(selectedHouse.pricePerMonth))}
                          </span>
                        </div>
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
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
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
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
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
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
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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