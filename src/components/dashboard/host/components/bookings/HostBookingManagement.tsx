/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// Types
interface HostBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  university: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
  priceRWF: number;
  totalPrice: number;
  totalPriceRWF: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'momo' | 'cash' | 'bank';
  paymentReference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  rejectedAt?: string;
  guestSpecialRequests?: string;
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    bookingSource?: string;
  };
}

interface BookingFormData {
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
  priceRWF: number;
  totalPrice: number;
  totalPriceRWF: number;
  status: HostBooking['status'];
  paymentStatus: HostBooking['paymentStatus'];
  paymentMethod: HostBooking['paymentMethod'];
  notes: string;
  guestSpecialRequests: string;
}

// Translations
const translations = {
  en: {
    hostBookings: 'Host Bookings',
    manageBookings: 'Manage bookings for your properties',
    total: 'Total',
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    paid: 'Paid',
    failed: 'Failed',
    refunded: 'Refunded',
    searchBookings: 'Search by guest, property, or location...',
    allStatus: 'All Status',
    allPaymentStatus: 'All Payment Status',
    booking: 'Booking',
    guest: 'Guest',
    property: 'Property',
    location: 'Location',
    status: 'Status',
    paymentStatus: 'Payment Status',
    amount: 'Amount',
    date: 'Date',
    actions: 'Actions',
    noBookings: 'No bookings found',
    adjustFilters: 'Try adjusting your search or filters',
    showing: 'Showing',
    of: 'of',
    bookings: 'bookings',
    viewBooking: 'View Booking',
    editBooking: 'Edit Booking',
    deleteBooking: 'Delete Booking',
    deleteConfirmation: 'Are you sure you want to delete this booking?',
    actionUndone: 'This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',
    bookingDeleted: 'Booking deleted successfully!',
    deleteFailed: 'Failed to delete booking',
    statusUpdated: 'Booking status updated successfully!',
    statusUpdateFailed: 'Failed to update booking status',
    bookingCreated: 'Booking created successfully!',
    createFailed: 'Failed to create booking',
    bookingUpdated: 'Booking updated successfully!',
    updateFailed: 'Failed to update booking',
    bookingDetails: 'Booking Details',
    propertyName: 'Property Name',
    guestName: 'Guest Name',
    guestEmail: 'Guest Email',
    guestPhone: 'Guest Phone',
    checkInDate: 'Check-in Date',
    checkOutDate: 'Check-out Date',
    nights: 'Nights',
    pricePerNight: 'Price per Night',
    totalPrice: 'Total Price',
    paymentMethod: 'Payment Method',
    paymentReference: 'Payment Reference',
    notes: 'Notes',
    guestSpecialRequests: 'Guest Special Requests',
    updateStatus: 'Update Status',
    selectStatus: 'Select Status',
    selectPaymentStatus: 'Select Payment Status',
    close: 'Close',
    createBooking: 'Create Booking',
    editBookingTitle: 'Edit Booking',
    newBooking: 'New Booking',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    price: 'Price',
    create: 'Create',
    update: 'Update',
    saving: 'Saving...',
    momo: 'MOMO',
    cash: 'Cash',
    bank: 'Bank Transfer',
    all: 'All',
    confirmBooking: 'Confirm Booking',
    completeBooking: 'Complete Booking',
    cancelBooking: 'Cancel Booking',
    rejectBooking: 'Reject Booking',
    bookingConfirmed: 'Booking confirmed successfully!',
    bookingCompleted: 'Booking completed successfully!',
    bookingCancelled: 'Booking cancelled successfully!',
    bookingRejected: 'Booking rejected successfully!',
    selectProperty: 'Select Property',
    revenue: 'Revenue',
    occupancy: 'Occupancy Rate',
    permissions: {
      cannotEdit: 'You cannot edit this booking',
      cannotDelete: 'You cannot delete this booking',
    },
  },
  fr: {
    hostBookings: 'Réservations des Hôtes',
    manageBookings: 'Gérer les réservations pour vos propriétés',
    total: 'Total',
    pending: 'En Attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
    rejected: 'Rejeté',
    paid: 'Payé',
    failed: 'Échoué',
    refunded: 'Remboursé',
    searchBookings: 'Rechercher par invité, propriété ou emplacement...',
    allStatus: 'Tous les Statuts',
    allPaymentStatus: 'Tous les Statuts de Paiement',
    booking: 'Réservation',
    guest: 'Invité',
    property: 'Propriété',
    location: 'Emplacement',
    status: 'Statut',
    paymentStatus: 'Statut de Paiement',
    amount: 'Montant',
    date: 'Date',
    actions: 'Actions',
    noBookings: 'Aucune réservation trouvée',
    adjustFilters: 'Essayez d\'ajuster votre recherche ou vos filtres',
    showing: 'Affichage',
    of: 'de',
    bookings: 'réservations',
    viewBooking: 'Voir la Réservation',
    editBooking: 'Modifier la Réservation',
    deleteBooking: 'Supprimer la Réservation',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cette réservation ?',
    actionUndone: 'Cette action est irréversible.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleting: 'Suppression...',
    bookingDeleted: 'Réservation supprimée avec succès !',
    deleteFailed: 'Échec de la suppression de la réservation',
    statusUpdated: 'Statut de la réservation mis à jour avec succès !',
    statusUpdateFailed: 'Échec de la mise à jour du statut',
    bookingCreated: 'Réservation créée avec succès !',
    createFailed: 'Échec de la création de la réservation',
    bookingUpdated: 'Réservation mise à jour avec succès !',
    updateFailed: 'Échec de la mise à jour de la réservation',
    bookingDetails: 'Détails de la Réservation',
    propertyName: 'Nom de la Propriété',
    guestName: 'Nom de l\'Invité',
    guestEmail: 'Email de l\'Invité',
    guestPhone: 'Téléphone de l\'Invité',
    checkInDate: 'Date d\'Arrivée',
    checkOutDate: 'Date de Départ',
    nights: 'Nuits',
    pricePerNight: 'Prix par Nuit',
    totalPrice: 'Prix Total',
    paymentMethod: 'Méthode de Paiement',
    paymentReference: 'Référence de Paiement',
    notes: 'Notes',
    guestSpecialRequests: 'Demandes Spéciales de l\'Invité',
    updateStatus: 'Mettre à Jour le Statut',
    selectStatus: 'Sélectionner le Statut',
    selectPaymentStatus: 'Sélectionner le Statut de Paiement',
    close: 'Fermer',
    createBooking: 'Créer une Réservation',
    editBookingTitle: 'Modifier la Réservation',
    newBooking: 'Nouvelle Réservation',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    price: 'Prix',
    create: 'Créer',
    update: 'Mettre à Jour',
    saving: 'Enregistrement...',
    momo: 'MOMO',
    cash: 'Espèces',
    bank: 'Virement Bancaire',
    all: 'Tous',
    confirmBooking: 'Confirmer la Réservation',
    completeBooking: 'Terminer la Réservation',
    cancelBooking: 'Annuler la Réservation',
    rejectBooking: 'Rejeter la Réservation',
    bookingConfirmed: 'Réservation confirmée avec succès !',
    bookingCompleted: 'Réservation terminée avec succès !',
    bookingCancelled: 'Réservation annulée avec succès !',
    bookingRejected: 'Réservation rejetée avec succès !',
    selectProperty: 'Sélectionner une Propriété',
    revenue: 'Revenu',
    occupancy: 'Taux d\'Occupation',
    permissions: {
      cannotEdit: 'Vous ne pouvez pas modifier cette réservation',
      cannotDelete: 'Vous ne pouvez pas supprimer cette réservation',
    },
  },
  rw: {
    hostBookings: 'Ibyemezo by\'Abatambyi',
    manageBookings: 'Gucunga ibyemezo by\'amazu yawe',
    total: 'Yose',
    pending: 'Bitegereje',
    confirmed: 'Byemejwe',
    completed: 'Byarangiye',
    cancelled: 'Byahagaritswe',
    rejected: 'Byangijwe',
    paid: 'Byishyuwe',
    failed: 'Birananiranye',
    refunded: 'Byasubijwe',
    searchBookings: 'Shakisha ukurikije umushyitsi, inzu cyangwa aho gihe...',
    allStatus: 'Ihagaze Ryose',
    allPaymentStatus: 'Ihagaze Ryose ry\'Ubwishyu',
    booking: 'Icyemezo',
    guest: 'Umushyitsi',
    property: 'Inzu',
    location: 'Aho Gihe',
    status: 'Ihagaze',
    paymentStatus: 'Ihagaze ry\'Ubwishyu',
    amount: 'Amahera',
    date: 'Itariki',
    actions: 'Ibikorwa',
    noBookings: 'Nta cyemezo cyabonetse',
    adjustFilters: 'Gerageza guhindura uburyo ushakisha cyangwa amatungo',
    showing: 'Bereka',
    of: 'muri',
    bookings: 'ibyemezo',
    viewBooking: 'Reba Icyemezo',
    editBooking: 'Hindura Icyemezo',
    deleteBooking: 'Kuraho Icyemezo',
    deleteConfirmation: 'Uri kwizera ko ushaka gukuraho iki cyemezo?',
    actionUndone: 'Iki gikorwa ntikishobora guhindurwa.',
    cancel: 'Reka',
    delete: 'Kuraho',
    deleting: 'Birakurwaho...',
    bookingDeleted: 'Icyemezo cyakuweho neza!',
    deleteFailed: 'Kuraho icyemezo birananiranye',
    statusUpdated: 'Ihagaze ry\'icyemezo ryavuguruwe neza!',
    statusUpdateFailed: 'Kuvugurura ihagaze birananiranye',
    bookingCreated: 'Icyemezo cyakozwe neza!',
    createFailed: 'Kora icyemezo birananiranye',
    bookingUpdated: 'Icyemezo cyavuguruwe neza!',
    updateFailed: 'Kuvugurura icyemezo birananiranye',
    bookingDetails: 'Ibisobanuro by\'Icyemezo',
    propertyName: 'Izina ry\'Inzu',
    guestName: 'Izina ry\'Umushyitsi',
    guestEmail: 'Imeri y\'Umushyitsi',
    guestPhone: 'Telefone y\'Umushyitsi',
    checkInDate: 'Itariki yo Kwinjira',
    checkOutDate: 'Itariki yo Kuva',
    nights: 'Ijoro',
    pricePerNight: 'Igiciro ku Ijoro',
    totalPrice: 'Igiciro Cyose',
    paymentMethod: 'Uburyo bwo Kwishyura',
    paymentReference: 'Referansi y\'Ubwishyu',
    notes: 'Ibisobanuro',
    guestSpecialRequests: 'Ibisabwa Bidasanzwe by\'Umushyitsi',
    updateStatus: 'Vugurura Ihagaze',
    selectStatus: 'Hitamo Ihagaze',
    selectPaymentStatus: 'Hitamo Ihagaze ry\'Ubwishyu',
    close: 'Funga',
    createBooking: 'Kora Icyemezo',
    editBookingTitle: 'Hindura Icyemezo',
    newBooking: 'Icyemezo Gishya',
    checkIn: 'Kwinjira',
    checkOut: 'Kuva',
    price: 'Igiciro',
    create: 'Kora',
    update: 'Vugurura',
    saving: 'Biremereza...',
    momo: 'MOMO',
    cash: 'Amafaranga',
    bank: 'Banki',
    all: 'Byose',
    confirmBooking: 'Emeza Icyemezo',
    completeBooking: 'Rangiza Icyemezo',
    cancelBooking: 'Hagarika Icyemezo',
    rejectBooking: 'Hakana Icyemezo',
    bookingConfirmed: 'Icyemezo cyemejwe neza!',
    bookingCompleted: 'Icyemezo cyarangiye neza!',
    bookingCancelled: 'Icyemezo cyahagaritswe neza!',
    bookingRejected: 'Icyemezo cyanangijwe neza!',
    selectProperty: 'Hitamo Inzu',
    revenue: 'Amahera Yakiriwe',
    occupancy: 'Abashyitsi',
    permissions: {
      cannotEdit: 'Ntushobora guhindura iki cyemezo',
      cannotDelete: 'Ntushobora gukuraho iki cyemezo',
    },
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

// Helper function to get user role from cookies
const getUserRole = (): 'admin' | 'user' | 'host' => {
  const role = Cookies.get('userRole') as 'admin' | 'user' | 'host';
  return role || 'user';
};

// Helper function to get user email from cookies
const getUserEmail = (): string => {
  return Cookies.get('userEmail') || '';
};

// Helper function to get user name from cookies

// Storage key
const STORAGE_KEY_HOST_BOOKINGS = 'host_bookings';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Initial bookings for host
const getInitialBookings = (_hostEmail: string): HostBooking[] => {
  return [
    {
      id: '1',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      university: 'INES-Ruhengeri',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Cyabararika',
      village: 'Cyabararika',
      guestId: 'guest_001',
      guestName: 'Jean Paul Mugisha',
      guestEmail: 'jean@example.com',
      guestPhone: '+250788123456',
      checkIn: '2024-02-01T00:00:00Z',
      checkOut: '2024-03-01T00:00:00Z',
      nights: 30,
      pricePerNight: 85,
      priceRWF: 110500,
      totalPrice: 2550,
      totalPriceRWF: 3315000,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'momo',
      paymentReference: 'MOMO-2024-001',
      notes: 'Guest requested ground floor room',
      guestSpecialRequests: 'Would prefer a quiet room away from the street',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-16T10:00:00Z',
      confirmedAt: '2024-01-16T10:00:00Z',
      metadata: {},
    },
    {
      id: '2',
      propertyId: 'prop_002',
      propertyName: 'Kigombe Student Apartments',
      propertyImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      university: 'INES-Ruhengeri',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Kigombe',
      village: 'Kigombe',
      guestId: 'guest_002',
      guestName: 'Marie Claire Uwimana',
      guestEmail: 'marie@example.com',
      guestPhone: '+250788123457',
      checkIn: '2024-02-15T00:00:00Z',
      checkOut: '2024-03-15T00:00:00Z',
      nights: 30,
      pricePerNight: 70,
      priceRWF: 91000,
      totalPrice: 2100,
      totalPriceRWF: 2730000,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'momo',
      notes: 'Waiting for payment confirmation',
      guestSpecialRequests: 'Need parking space for a motorcycle',
      createdAt: '2024-01-17T14:00:00Z',
      updatedAt: '2024-01-17T14:00:00Z',
      metadata: {},
    },
    {
      id: '3',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      propertyImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop',
      university: 'INES-Ruhengeri',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Cyabararika',
      village: 'Cyabararika',
      guestId: 'guest_003',
      guestName: 'David Niyonzima',
      guestEmail: 'david@example.com',
      guestPhone: '+250788123458',
      checkIn: '2024-01-20T00:00:00Z',
      checkOut: '2024-02-20T00:00:00Z',
      nights: 30,
      pricePerNight: 50,
      priceRWF: 65000,
      totalPrice: 1500,
      totalPriceRWF: 1950000,
      status: 'completed',
      paymentStatus: 'paid',
      paymentMethod: 'cash',
      paymentReference: 'CASH-2024-003',
      notes: 'Student already moved in',
      guestSpecialRequests: 'Requested extra pillows and blankets',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-12T15:00:00Z',
      confirmedAt: '2024-01-11T10:00:00Z',
      completedAt: '2024-01-20T08:00:00Z',
      metadata: {},
    },
    {
      id: '4',
      propertyId: 'prop_002',
      propertyName: 'Kigombe Student Apartments',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      university: 'INES-Ruhengeri',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Kigombe',
      village: 'Kigombe',
      guestId: 'guest_004',
      guestName: 'Grace Uwase',
      guestEmail: 'grace@example.com',
      guestPhone: '+250788123459',
      checkIn: '2024-03-01T00:00:00Z',
      checkOut: '2024-04-01T00:00:00Z',
      nights: 30,
      pricePerNight: 72,
      priceRWF: 93600,
      totalPrice: 2160,
      totalPriceRWF: 2808000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'momo',
      paymentReference: 'MOMO-2024-004',
      notes: 'Guest cancelled due to change of plans',
      guestSpecialRequests: 'Was requesting early check-in',
      createdAt: '2024-01-18T11:00:00Z',
      updatedAt: '2024-01-19T16:00:00Z',
      confirmedAt: '2024-01-18T14:00:00Z',
      cancelledAt: '2024-01-19T16:00:00Z',
      metadata: {},
    },
    {
      id: '5',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      university: 'INES-Ruhengeri',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Cyabararika',
      village: 'Cyabararika',
      guestId: 'guest_005',
      guestName: 'Eric Kamanzi',
      guestEmail: 'eric@example.com',
      guestPhone: '+250788123460',
      checkIn: '2024-02-10T00:00:00Z',
      checkOut: '2024-03-10T00:00:00Z',
      nights: 30,
      pricePerNight: 68,
      priceRWF: 88400,
      totalPrice: 2040,
      totalPriceRWF: 2652000,
      status: 'rejected',
      paymentStatus: 'failed',
      paymentMethod: 'momo',
      notes: 'Payment verification failed',
      guestSpecialRequests: 'Requested room with study desk',
      createdAt: '2024-01-19T13:00:00Z',
      updatedAt: '2024-01-20T09:00:00Z',
      rejectedAt: '2024-01-20T09:00:00Z',
      metadata: {},
    },
  ];
};

// Helper functions
const getBookings = (hostEmail: string): HostBooking[] => {
  const data = localStorage.getItem(STORAGE_KEY_HOST_BOOKINGS);
  if (data) {
    return JSON.parse(data);
  }
  const initialBookings = getInitialBookings(hostEmail);
  localStorage.setItem(STORAGE_KEY_HOST_BOOKINGS, JSON.stringify(initialBookings));
  return initialBookings;
};

const saveBookings = (bookings: HostBooking[]): void => {
  localStorage.setItem(STORAGE_KEY_HOST_BOOKINGS, JSON.stringify(bookings));
};

export const HostBookingManagement: React.FC = () => {
  // Get language and user info from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const userRole = getUserRole();
  const userEmail = getUserEmail();
  
  const [bookings, setBookings] = useState<HostBooking[]>(getBookings(userEmail));
  const [filteredBookings, setFilteredBookings] = useState<HostBooking[]>(getBookings(userEmail));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all');

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<HostBooking | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('');

  // Form state for create/edit
  const [formData, setFormData] = useState<BookingFormData>({
    propertyId: '',
    propertyName: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    nights: 30,
    pricePerNight: 0,
    priceRWF: 0,
    totalPrice: 0,
    totalPriceRWF: 0,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'momo',
    notes: '',
    guestSpecialRequests: '',
  });

  // Properties for dropdown
  const [hostProperties] = useState<{id: string; name: string; image: string}[]>([
    { id: 'prop_001', name: 'INES Ruhengeri Student Lodge', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop' },
    { id: 'prop_002', name: 'Kigombe Student Apartments', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  ]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    rejected: 0,
    paid: 0,
    pendingPayment: 0,
    totalRevenue: 0,
    occupancyRate: 0,
  });

  const t = translations[lang];
  const isAdmin = userRole === 'admin';
  const isHost = userRole === 'host' || isAdmin;

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

  // Refresh bookings
  useEffect(() => {
    const refreshed = getBookings(userEmail);
    setBookings(refreshed);
  }, [userEmail]);

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.propertyName.toLowerCase().includes(term) ||
          b.guestName.toLowerCase().includes(term) ||
          b.university.toLowerCase().includes(term) ||
          b.district.toLowerCase().includes(term) ||
          b.sector.toLowerCase().includes(term) ||
          b.village.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    if (filterPaymentStatus !== 'all') {
      filtered = filtered.filter((b) => b.paymentStatus === filterPaymentStatus);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filterStatus, filterPaymentStatus]);

  // Update statistics
  useEffect(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
    const completed = bookings.filter((b) => b.status === 'completed').length;
    const cancelled = bookings.filter((b) => b.status === 'cancelled').length;
    const rejected = bookings.filter((b) => b.status === 'rejected').length;
    const paid = bookings.filter((b) => b.paymentStatus === 'paid').length;
    const pendingPayment = bookings.filter((b) => b.paymentStatus === 'pending').length;
    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPriceRWF, 0);
    const occupancyRate = total > 0 ? (confirmed + completed) / total * 100 : 0;

    setStats({
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      rejected,
      paid,
      pendingPayment,
      totalRevenue,
      occupancyRate,
    });
  }, [bookings]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending':
        return t.pending;
      case 'confirmed':
        return t.confirmed;
      case 'completed':
        return t.completed;
      case 'cancelled':
        return t.cancelled;
      case 'rejected':
        return t.rejected;
      default:
        return status;
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number): string => {
    return `RWF ${amount.toLocaleString()}`;
  };

  // Check if user can edit/delete booking
  const canEditBooking = (booking: HostBooking): boolean => {
    return isAdmin || (booking.status === 'pending');
  };

  const canDeleteBooking = (booking: HostBooking): boolean => {
    return isAdmin || (booking.status === 'pending');
  };

  // CRUD Operations
  const handleCreateBooking = async () => {
    if (!formData.propertyId || !formData.guestName || !formData.checkIn || !formData.checkOut) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const property = hostProperties.find(p => p.id === formData.propertyId);
      
      const newBooking: HostBooking = {
        id: generateId(),
        propertyId: formData.propertyId,
        propertyName: property?.name || 'Unknown Property',
        propertyImage: property?.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        university: 'Sample University',
        district: 'Sample District',
        sector: 'Sample Sector',
        cell: 'Sample Cell',
        village: 'Sample Village',
        guestId: `guest_${Date.now()}`,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        nights: formData.nights,
        pricePerNight: formData.pricePerNight,
        priceRWF: formData.priceRWF,
        totalPrice: formData.totalPrice,
        totalPriceRWF: formData.totalPriceRWF,
        status: formData.status,
        paymentStatus: formData.paymentStatus,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        guestSpecialRequests: formData.guestSpecialRequests,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {},
      };

      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      saveBookings(updatedBookings);

      toast.success(`✅ ${t.bookingCreated}`);
      resetForm();
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error(`❌ ${t.createFailed}`);
      console.error('Create booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedBooking: HostBooking = {
        ...selectedBooking,
        status: (selectedStatus as HostBooking['status']) || selectedBooking.status,
        paymentStatus: (selectedPaymentStatus as HostBooking['paymentStatus']) || selectedBooking.paymentStatus,
        updatedAt: new Date().toISOString(),
        ...(selectedStatus === 'confirmed' && !selectedBooking.confirmedAt ? { confirmedAt: new Date().toISOString() } : {}),
        ...(selectedStatus === 'completed' ? { completedAt: new Date().toISOString() } : {}),
        ...(selectedStatus === 'cancelled' ? { cancelledAt: new Date().toISOString() } : {}),
        ...(selectedStatus === 'rejected' ? { rejectedAt: new Date().toISOString() } : {}),
      };

      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id ? updatedBooking : b
      );
      setBookings(updatedBookings);
      saveBookings(updatedBookings);

      toast.success(`✅ ${t.bookingUpdated}`);
      setIsEditModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ ${t.updateFailed}`);
      console.error('Update booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedBookings = bookings.filter((b) => b.id !== selectedBooking.id);
      setBookings(updatedBookings);
      saveBookings(updatedBookings);

      toast.success(`🗑️ ${t.bookingDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ ${t.deleteFailed}`);
      console.error('Delete booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: HostBooking['status']) => {
    try {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) return;

      const updatedBooking: HostBooking = {
        ...booking,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        ...(newStatus === 'confirmed' && !booking.confirmedAt ? { confirmedAt: new Date().toISOString() } : {}),
        ...(newStatus === 'completed' ? { completedAt: new Date().toISOString() } : {}),
        ...(newStatus === 'cancelled' ? { cancelledAt: new Date().toISOString() } : {}),
        ...(newStatus === 'rejected' ? { rejectedAt: new Date().toISOString() } : {}),
      };

      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? updatedBooking : b
      );
      setBookings(updatedBookings);
      saveBookings(updatedBookings);

      const statusMessages: Record<string, string> = {
        confirmed: t.bookingConfirmed,
        completed: t.bookingCompleted,
        cancelled: t.bookingCancelled,
        rejected: t.bookingRejected,
      };

      toast.success(`✅ ${statusMessages[newStatus] || t.statusUpdated}`);
    } catch (error) {
      toast.error(`❌ ${t.statusUpdateFailed}`);
      console.error('Status update error:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      propertyId: '',
      propertyName: '',
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      checkIn: '',
      checkOut: '',
      nights: 30,
      pricePerNight: 0,
      priceRWF: 0,
      totalPrice: 0,
      totalPriceRWF: 0,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'momo',
      notes: '',
      guestSpecialRequests: '',
    });
  };

  // Open modals
  const openViewModal = (booking: HostBooking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const openEditModal = (booking: HostBooking) => {
    setSelectedBooking(booking);
    setSelectedStatus(booking.status);
    setSelectedPaymentStatus(booking.paymentStatus);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (booking: HostBooking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    const refreshed = getBookings(userEmail);
    setBookings(refreshed);
    toast.success('Bookings refreshed!');
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

  if (!isHost) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700">Access Denied</h2>
          <p className="text-gray-500">You need to be a host to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-7 h-7 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.hostBookings}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageBookings}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {t.createBooking}
            </motion.button>
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200">
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200">
          <p className="text-xs text-blue-600">{t.confirmed}</p>
          <p className="text-xl font-bold text-blue-700">{stats.confirmed}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.completed}</p>
          <p className="text-xl font-bold text-green-700">{stats.completed}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
          <p className="text-xs text-red-600">{t.cancelled}</p>
          <p className="text-xl font-bold text-red-700">{stats.cancelled}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.rejected}</p>
          <p className="text-xl font-bold text-gray-900">{stats.rejected}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.revenue}</p>
          <p className="text-xl font-bold text-green-700">{formatCurrency(stats.totalRevenue)}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
          <p className="text-xs text-purple-600">{t.occupancy}</p>
          <p className="text-xl font-bold text-purple-700">{stats.occupancyRate.toFixed(1)}%</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.searchBookings}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="confirmed">{t.confirmed}</option>
              <option value="completed">{t.completed}</option>
              <option value="cancelled">{t.cancelled}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allPaymentStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="paid">{t.paid}</option>
              <option value="failed">{t.failed}</option>
              <option value="refunded">{t.refunded}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterPaymentStatus('all');
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.booking}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.guest}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.property}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.amount}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.date}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>{t.noBookings}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openViewModal(booking)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.propertyImage}
                          alt={booking.propertyName}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.guestName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {booking.propertyName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{booking.guestName}</p>
                      <p className="text-xs text-gray-400">{booking.guestEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{booking.propertyName}</p>
                      <p className="text-xs text-gray-400">{booking.village}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(booking.totalPriceRWF)}
                      </p>
                      <p className="text-xs text-gray-400">{booking.nights} nights</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{formatDate(booking.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(booking);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewBooking}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        {canEditBooking(booking) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(booking);
                            }}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.editBooking}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </motion.button>
                        )}
                        {canDeleteBooking(booking) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(booking);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t.deleteBooking}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        )}
                        {!canEditBooking(booking) && !canDeleteBooking(booking) && !isAdmin && (
                          <span className="text-xs text-gray-400">View only</span>
                        )}
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
            {t.showing} {filteredBookings.length} {t.of} {bookings.length} {t.bookings}
          </p>
        </div>
      </div>

      {/* View Booking Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedBooking && (
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.bookingDetails}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedBooking.propertyImage}
                      alt={selectedBooking.propertyName}
                      className="w-full md:w-48 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{selectedBooking.propertyName}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        {selectedBooking.university}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selectedBooking.village}, {selectedBooking.district}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedBooking.guestName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestEmail}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedBooking.guestEmail}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestPhone}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedBooking.guestPhone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.paymentMethod}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{selectedBooking.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.checkInDate}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{formatDate(selectedBooking.checkIn)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.checkOutDate}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{formatDate(selectedBooking.checkOut)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.nights}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedBooking.nights} nights</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.status}</label>
                      <div className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedBooking.status)}`}>
                          {getStatusLabel(selectedBooking.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.paymentStatus}</label>
                      <div className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                          {selectedBooking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-gray-500">{t.pricePerNight}</label>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(selectedBooking.priceRWF)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">{t.totalPrice}</label>
                        <p className="text-sm font-semibold text-[#FF385C]">{formatCurrency(selectedBooking.totalPriceRWF)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Payment Reference</label>
                        <p className="text-sm font-medium text-gray-900">{selectedBooking.paymentReference || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.guestSpecialRequests && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestSpecialRequests}</label>
                      <p className="text-sm text-gray-700 mt-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        {selectedBooking.guestSpecialRequests}
                      </p>
                    </div>
                  )}

                  {selectedBooking.notes && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.notes}</label>
                      <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{selectedBooking.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {selectedBooking.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            handleStatusUpdate(selectedBooking.id, 'confirmed');
                            setIsViewModalOpen(false);
                          }}
                          className="px-4 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {t.confirmBooking}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            handleStatusUpdate(selectedBooking.id, 'rejected');
                            setIsViewModalOpen(false);
                          }}
                          className="px-4 py-2.5 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {t.rejectBooking}
                        </motion.button>
                      </>
                    )}
                    {selectedBooking.status === 'confirmed' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleStatusUpdate(selectedBooking.id, 'completed');
                          setIsViewModalOpen(false);
                        }}
                        className="px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {t.completeBooking}
                      </motion.button>
                    )}
                    {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleStatusUpdate(selectedBooking.id, 'cancelled');
                          setIsViewModalOpen(false);
                        }}
                        className="px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t.cancelBooking}
                      </motion.button>
                    )}
                    {canEditBooking(selectedBooking) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsViewModalOpen(false);
                          openEditModal(selectedBooking);
                        }}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ml-auto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        {t.editBooking}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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

      {/* Edit Booking Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.editBookingTitle}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedBooking(null);
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.status}</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="confirmed">{t.confirmed}</option>
                        <option value="completed">{t.completed}</option>
                        <option value="cancelled">{t.cancelled}</option>
                        <option value="rejected">{t.rejected}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.paymentStatus}</label>
                      <select
                        value={selectedPaymentStatus}
                        onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="paid">{t.paid}</option>
                        <option value="failed">{t.failed}</option>
                        <option value="refunded">{t.refunded}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.notes}</label>
                    <textarea
                      value={selectedBooking?.notes || ''}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking!, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Add notes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.guestSpecialRequests}</label>
                    <textarea
                      value={selectedBooking?.guestSpecialRequests || ''}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking!, guestSpecialRequests: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Guest special requests..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {t.update}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{t.deleteBooking}</h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.deleteConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">{t.actionUndone}</span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteBooking}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.deleting}
                        </span>
                      ) : (
                        t.delete
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Booking Modal */}
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
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.newBooking}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetForm();
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestName} *
                      </label>
                      <input
                        type="text"
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Guest name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestEmail}
                      </label>
                      <input
                        type="email"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="guest@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestPhone}
                      </label>
                      <input
                        type="text"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="+250788123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.selectProperty}
                      </label>
                      <select
                        value={formData.propertyId}
                        onChange={(e) => {
                          const property = hostProperties.find(p => p.id === e.target.value);
                          setFormData({ 
                            ...formData, 
                            propertyId: e.target.value,
                            propertyName: property?.name || ''
                          });
                        }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="">Select a property</option>
                        {hostProperties.map((prop) => (
                          <option key={prop.id} value={prop.id}>{prop.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.checkIn} *
                      </label>
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.checkOut} *
                      </label>
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.nights}
                      </label>
                      <input
                        type="number"
                        value={formData.nights}
                        onChange={(e) => setFormData({ ...formData, nights: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.price} (USD)
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.price} (RWF)
                      </label>
                      <input
                        type="number"
                        value={formData.priceRWF}
                        onChange={(e) => setFormData({ ...formData, priceRWF: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.total} (RWF)
                      </label>
                      <input
                        type="number"
                        value={formData.totalPriceRWF}
                        onChange={(e) => setFormData({ ...formData, totalPriceRWF: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.status}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as HostBooking['status'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="confirmed">{t.confirmed}</option>
                        <option value="completed">{t.completed}</option>
                        <option value="cancelled">{t.cancelled}</option>
                        <option value="rejected">{t.rejected}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.paymentStatus}
                      </label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as HostBooking['paymentStatus'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="paid">{t.paid}</option>
                        <option value="failed">{t.failed}</option>
                        <option value="refunded">{t.refunded}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.paymentMethod}
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as HostBooking['paymentMethod'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="momo">{t.momo}</option>
                        <option value="cash">{t.cash}</option>
                        <option value="bank">{t.bank}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.guestSpecialRequests}
                    </label>
                    <textarea
                      value={formData.guestSpecialRequests}
                      onChange={(e) => setFormData({ ...formData, guestSpecialRequests: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Special requests from guest..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.notes}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Add notes..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          {t.create}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
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