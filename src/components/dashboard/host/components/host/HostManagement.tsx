/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// Types
interface HostProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: 'host' | 'admin' | 'user';
  avatar?: string;
  joinedDate: string;
  bio?: string;
  company?: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  responseRate: number;
  responseTime: string;
  properties: Property[];
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface Property {
  id: string;
  hostId: string;
  name: string;
  description: string;
  images: string[];
  address: {
    district: string;
    sector: string;
    cell: string;
    village: string;
    street?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  university: string;
  type: 'apartment' | 'house' | 'studio' | 'room' | 'villa';
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  priceRWF: number;
  amenities: string[];
  availability: {
    startDate: string;
    endDate: string;
    isAvailable: boolean;
  }[];
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  views: number;
  bookings: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

// Translations
const translations = {
  en: {
    hostManagement: 'Host Management',
    manageHostProfile: 'Manage your host profile and properties',
    profile: 'Profile',
    properties: 'Properties',
    settings: 'Settings',
    editProfile: 'Edit Profile',
    addProperty: 'Add Property',
    editProperty: 'Edit Property',
    deleteProperty: 'Delete Property',
    deleteConfirmation: 'Are you sure you want to delete this property?',
    actionUndone: 'This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',
    propertyDeleted: 'Property deleted successfully!',
    deleteFailed: 'Failed to delete property',
    profileUpdated: 'Profile updated successfully!',
    profileUpdateFailed: 'Failed to update profile',
    propertyCreated: 'Property created successfully!',
    propertyUpdated: 'Property updated successfully!',
    createFailed: 'Failed to create property',
    updateFailed: 'Failed to update property',
    totalProperties: 'Total Properties',
    activeProperties: 'Active',
    pendingProperties: 'Pending',
    inactiveProperties: 'Inactive',
    totalViews: 'Total Views',
    totalBookings: 'Total Bookings',
    rating: 'Rating',
    searchProperties: 'Search properties...',
    allStatus: 'All Status',
    allTypes: 'All Types',
    property: 'Property',
    type: 'Type',
    location: 'Location',
    status: 'Status',
    price: 'Price',
    actions: 'Actions',
    noProperties: 'No properties found',
    adjustFilters: 'Try adjusting your search or filters',
    showing: 'Showing',
    of: 'of',
    propertiesCount: 'properties',
    viewProperty: 'View Property',
    propertyDetails: 'Property Details',
    propertyName: 'Property Name',
    description: 'Description',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    maxGuests: 'Max Guests',
    pricePerNight: 'Price per Night',
    university: 'University',
    district: 'District',
    sector: 'Sector',
    cell: 'Cell',
    village: 'Village',
    amenities: 'Amenities',
    availability: 'Availability',
    images: 'Images',
    close: 'Close',
    save: 'Save',
    saving: 'Saving...',
    create: 'Create',
    update: 'Update',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    bio: 'Bio',
    company: 'Company',
    language: 'Language',
    currency: 'Currency',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    smsNotifications: 'SMS Notifications',
    pushNotifications: 'Push Notifications',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    accountHolder: 'Account Holder',
    verified: 'Verified',
    responseRate: 'Response Rate',
    responseTime: 'Response Time',
    memberSince: 'Member Since',
    totalReviews: 'Total Reviews',
    apartment: 'Apartment',
    house: 'House',
    studio: 'Studio',
    room: 'Room',
    villa: 'Villa',
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    all: 'All',
    selectStatus: 'Select Status',
    selectType: 'Select Type',
    enterName: 'Enter property name',
    enterDescription: 'Enter property description',
    enterPrice: 'Enter price per night',
    enterBedrooms: 'Enter number of bedrooms',
    enterBathrooms: 'Enter number of bathrooms',
    enterMaxGuests: 'Enter maximum guests',
    uploadImage: 'Upload Image',
    addAmenity: 'Add Amenity',
    remove: 'Remove',
    startDate: 'Start Date',
    endDate: 'End Date',
    isAvailable: 'Is Available',
    permissions: {
      adminOnly: 'Only admins can change host status',
      cannotEdit: 'You cannot edit this property',
      cannotDelete: 'You cannot delete this property',
    },
    statuses: {
      pending: 'Pending',
      reviewing: 'Reviewing',
      resolved: 'Resolved',
      rejected: 'Rejected',
    },
  },
  fr: {
    hostManagement: 'Gestion des Hôtes',
    manageHostProfile: 'Gérez votre profil hôte et vos propriétés',
    profile: 'Profil',
    properties: 'Propriétés',
    settings: 'Paramètres',
    editProfile: 'Modifier le Profil',
    addProperty: 'Ajouter une Propriété',
    editProperty: 'Modifier la Propriété',
    deleteProperty: 'Supprimer la Propriété',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cette propriété ?',
    actionUndone: 'Cette action est irréversible.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleting: 'Suppression...',
    propertyDeleted: 'Propriété supprimée avec succès !',
    deleteFailed: 'Échec de la suppression de la propriété',
    profileUpdated: 'Profil mis à jour avec succès !',
    profileUpdateFailed: 'Échec de la mise à jour du profil',
    propertyCreated: 'Propriété créée avec succès !',
    propertyUpdated: 'Propriété mise à jour avec succès !',
    createFailed: 'Échec de la création de la propriété',
    updateFailed: 'Échec de la mise à jour de la propriété',
    totalProperties: 'Total des Propriétés',
    activeProperties: 'Actif',
    pendingProperties: 'En Attente',
    inactiveProperties: 'Inactif',
    totalViews: 'Vues Totales',
    totalBookings: 'Réservations Totales',
    rating: 'Évaluation',
    searchProperties: 'Rechercher des propriétés...',
    allStatus: 'Tous les Statuts',
    allTypes: 'Tous les Types',
    property: 'Propriété',
    type: 'Type',
    location: 'Emplacement',
    status: 'Statut',
    price: 'Prix',
    actions: 'Actions',
    noProperties: 'Aucune propriété trouvée',
    adjustFilters: 'Essayez d\'ajuster votre recherche ou vos filtres',
    showing: 'Affichage',
    of: 'de',
    propertiesCount: 'propriétés',
    viewProperty: 'Voir la Propriété',
    propertyDetails: 'Détails de la Propriété',
    propertyName: 'Nom de la Propriété',
    description: 'Description',
    bedrooms: 'Chambres',
    bathrooms: 'Salles de Bain',
    maxGuests: 'Max Invités',
    pricePerNight: 'Prix par Nuit',
    university: 'Université',
    district: 'District',
    sector: 'Secteur',
    cell: 'Cellule',
    village: 'Village',
    amenities: 'Équipements',
    availability: 'Disponibilité',
    images: 'Images',
    close: 'Fermer',
    save: 'Enregistrer',
    saving: 'Enregistrement...',
    create: 'Créer',
    update: 'Mettre à Jour',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    bio: 'Bio',
    company: 'Entreprise',
    language: 'Langue',
    currency: 'Devise',
    notifications: 'Notifications',
    emailNotifications: 'Notifications par Email',
    smsNotifications: 'Notifications par SMS',
    pushNotifications: 'Notifications Push',
    bankName: 'Nom de la Banque',
    accountNumber: 'Numéro de Compte',
    accountHolder: 'Titulaire du Compte',
    verified: 'Vérifié',
    responseRate: 'Taux de Réponse',
    responseTime: 'Temps de Réponse',
    memberSince: 'Membre depuis',
    totalReviews: 'Total des Avis',
    apartment: 'Appartement',
    house: 'Maison',
    studio: 'Studio',
    room: 'Chambre',
    villa: 'Villa',
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En Attente',
    suspended: 'Suspendu',
    all: 'Tous',
    selectStatus: 'Sélectionner le Statut',
    selectType: 'Sélectionner le Type',
    enterName: 'Entrez le nom de la propriété',
    enterDescription: 'Entrez la description de la propriété',
    enterPrice: 'Entrez le prix par nuit',
    enterBedrooms: 'Entrez le nombre de chambres',
    enterBathrooms: 'Entrez le nombre de salles de bain',
    enterMaxGuests: 'Entrez le nombre maximum d\'invités',
    uploadImage: 'Télécharger une Image',
    addAmenity: 'Ajouter un Équipement',
    remove: 'Supprimer',
    startDate: 'Date de Début',
    endDate: 'Date de Fin',
    isAvailable: 'Disponible',
    permissions: {
      adminOnly: 'Seuls les administrateurs peuvent changer le statut',
      cannotEdit: 'Vous ne pouvez pas modifier cette propriété',
      cannotDelete: 'Vous ne pouvez pas supprimer cette propriété',
    },
    statuses: {
      pending: 'En Attente',
      reviewing: 'En Révision',
      resolved: 'Résolu',
      rejected: 'Rejeté',
    },
  },
  rw: {
    hostManagement: 'Gucunga Abatambyi',
    manageHostProfile: 'Gucunga amakuru yawe n\'amazu yawe',
    profile: 'Profil',
    properties: 'Amazu',
    settings: 'Igenamiterere',
    editProfile: 'Hindura Profil',
    addProperty: 'Ongera Inzu',
    editProperty: 'Hindura Inzu',
    deleteProperty: 'Kuraho Inzu',
    deleteConfirmation: 'Uri kwizera ko ushaka gukuraho iyi nzu?',
    actionUndone: 'Iki gikorwa ntikishobora guhindurwa.',
    cancel: 'Reka',
    delete: 'Kuraho',
    deleting: 'Birakurwaho...',
    propertyDeleted: 'Inzu yakuweho neza!',
    deleteFailed: 'Kuraho inzu birananiranye',
    profileUpdated: 'Profil yavuguruwe neza!',
    profileUpdateFailed: 'Kuvugurura profil birananiranye',
    propertyCreated: 'Inzu yakozwe neza!',
    propertyUpdated: 'Inzu yavuguruwe neza!',
    createFailed: 'Kora inzu birananiranye',
    updateFailed: 'Kuvugurura inzu birananiranye',
    totalProperties: 'Amazu Yose',
    activeProperties: 'Ariho',
    pendingProperties: 'Bitegereje',
    inactiveProperties: 'Ntaho',
    totalViews: 'Amashusho Yose',
    totalBookings: 'Ibyemezo Byose',
    rating: 'Amanota',
    searchProperties: 'Shakisha amazu...',
    allStatus: 'Ihagaze Ryose',
    allTypes: 'Ubwoko Bwose',
    property: 'Inzu',
    type: 'Ubwoko',
    location: 'Aho Gihe',
    status: 'Ihagaze',
    price: 'Igiciro',
    actions: 'Ibikorwa',
    noProperties: 'Nta nzu yabonetse',
    adjustFilters: 'Gerageza guhindura uburyo ushakisha cyangwa amatungo',
    showing: 'Bereka',
    of: 'muri',
    propertiesCount: 'amazu',
    viewProperty: 'Reba Inzu',
    propertyDetails: 'Ibisobanuro by\'Inzu',
    propertyName: 'Izina ry\'Inzu',
    description: 'Ibisobanuro',
    bedrooms: 'Ibyumba',
    bathrooms: 'Amazu y\'isuku',
    maxGuests: 'Abashyitsi Benshi',
    pricePerNight: 'Igiciro ku Ijoro',
    university: 'Kaminuza',
    district: 'Akarere',
    sector: 'Umurenge',
    cell: 'Akagari',
    village: 'Umudugudu',
    amenities: 'Ibikoresho',
    availability: 'Kuboneka',
    images: 'Amashusho',
    close: 'Funga',
    save: 'Bika',
    saving: 'Birabikwa...',
    create: 'Kora',
    update: 'Vugurura',
    name: 'Izina',
    email: 'Imeri',
    phone: 'Telefone',
    bio: 'Ibisobanuro',
    company: 'Ishyirahamwe',
    language: 'Ururimi',
    currency: 'Ifaranga',
    notifications: 'Imenyesha',
    emailNotifications: 'Imenyesha kuri Email',
    smsNotifications: 'Imenyesha kuri SMS',
    pushNotifications: 'Imenyesha Push',
    bankName: 'Izina ry\'Banki',
    accountNumber: 'Nomero ya Konti',
    accountHolder: 'Nyiri Konti',
    verified: 'Byemejwe',
    responseRate: 'Ugusubiza',
    responseTime: 'Igihe cyo Gusubiza',
    memberSince: 'Yinjiye kuva',
    totalReviews: 'Ibitekerezo Byose',
    apartment: 'Apartamento',
    house: 'Inzu',
    studio: 'Studio',
    room: 'Icyumba',
    villa: 'Villa',
    active: 'Ariho',
    inactive: 'Ntaho',
    pending: 'Bitegereje',
    suspended: 'Byahagaritswe',
    all: 'Byose',
    selectStatus: 'Hitamo Ihagaze',
    selectType: 'Hitamo Ubwoko',
    enterName: 'Andika izina ry\'inzu',
    enterDescription: 'Andika ibisobanuro by\'inzu',
    enterPrice: 'Andika igiciro ku ijoro',
    enterBedrooms: 'Andika umubare w\'ibyumba',
    enterBathrooms: 'Andika umubare w\'amazu y\'isuku',
    enterMaxGuests: 'Andika umubare w\'abashyitsi',
    uploadImage: 'Ongeraho Ishusho',
    addAmenity: 'Ongeraho Ibikoresho',
    remove: 'Kuraho',
    startDate: 'Itariki yo Gutangira',
    endDate: 'Itariki yo Kurangira',
    isAvailable: 'Irahari',
    permissions: {
      adminOnly: 'Abayobozi gusa nibo bashobora guhindura ihagaze',
      cannotEdit: 'Ntushobora guhindura iyi nzu',
      cannotDelete: 'Ntushobora gukuraho iyi nzu',
    },
    statuses: {
      pending: 'Bitegereje',
      reviewing: 'Birisuzumwa',
      resolved: 'Byakemutse',
      rejected: 'Byangijwe',
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
const getUserName = (): string => {
  return Cookies.get('userName') || '';
};

// Storage key
const STORAGE_KEY_HOST = 'host_data';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Initial host profile
const getInitialHostProfile = (userEmail: string, userName: string): HostProfile => {
  return {
    id: generateId(),
    userId: userEmail,
    name: userName || 'John Doe',
    email: userEmail || 'host@example.com',
    phone: '+250788123456',
    role: 'host',
    joinedDate: new Date().toISOString(),
    bio: 'Experienced host with multiple properties in Rwanda. Dedicated to providing comfortable and affordable accommodation for students and visitors.',
    company: 'Rwanda Host Properties',
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    responseRate: 98,
    responseTime: '2 hours',
    properties: [],
    bankDetails: {
      bankName: 'Bank of Kigali',
      accountNumber: '1234567890',
      accountHolder: 'John Doe',
    },
    preferences: {
      language: 'en',
      currency: 'RWF',
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Initial properties
const getInitialProperties = (hostId: string): Property[] => {
  return [
    {
      id: '1',
      hostId: hostId,
      name: 'INES Ruhengeri Student Lodge',
      description: 'Modern student accommodation near INES-Ruhengeri. Fully furnished rooms with high-speed internet, study areas, and 24/7 security.',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      ],
      address: {
        district: 'Musanze',
        sector: 'Muhoza',
        cell: 'Cyabararika',
        village: 'Cyabararika',
      },
      university: 'INES-Ruhengeri',
      type: 'apartment',
      bedrooms: 4,
      bathrooms: 2,
      maxGuests: 8,
      pricePerNight: 85,
      priceRWF: 110500,
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Security', 'Study Area', 'Laundry'],
      availability: [
        {
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          isAvailable: true,
        },
      ],
      status: 'active',
      views: 156,
      bookings: 45,
      rating: 4.9,
      totalReviews: 23,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      hostId: hostId,
      name: 'Kigombe Student Apartments',
      description: 'Spacious apartments located in a quiet neighborhood. Perfect for students looking for a peaceful study environment.',
      images: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      ],
      address: {
        district: 'Musanze',
        sector: 'Muhoza',
        cell: 'Kigombe',
        village: 'Kigombe',
      },
      university: 'INES-Ruhengeri',
      type: 'house',
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      pricePerNight: 70,
      priceRWF: 91000,
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Garden', 'Furnished'],
      availability: [
        {
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          isAvailable: true,
        },
      ],
      status: 'pending',
      views: 89,
      bookings: 12,
      rating: 4.5,
      totalReviews: 8,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
  ];
};

// Helper functions
const getHostData = (userEmail: string, userName: string): { profile: HostProfile; properties: Property[] } => {
  const storedData = localStorage.getItem(STORAGE_KEY_HOST);
  if (storedData) {
    const data = JSON.parse(storedData);
    return data;
  }
  // Initialize with initial data
  const hostProfile = getInitialHostProfile(userEmail, userName);
  const properties = getInitialProperties(hostProfile.id);
  const data = { profile: hostProfile, properties };
  localStorage.setItem(STORAGE_KEY_HOST, JSON.stringify(data));
  return data;
};

const saveHostData = (profile: HostProfile, properties: Property[]): void => {
  const data = { profile, properties };
  localStorage.setItem(STORAGE_KEY_HOST, JSON.stringify(data));
};

export const HostManagement: React.FC = () => {
  // Get language and user info from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const userRole = getUserRole();
  const userEmail = getUserEmail();
  const userName = getUserName();
  
  const [hostProfile, setHostProfile] = useState<HostProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Profile form state
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    company: '',
    language: 'en',
    currency: 'RWF',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  });

  // Property form state
  const [propertyFormData, setPropertyFormData] = useState({
    name: '',
    description: '',
    university: '',
    type: 'apartment' as Property['type'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 0,
    priceRWF: 0,
    district: '',
    sector: '',
    cell: '',
    village: '',
    amenities: [] as string[],
    images: [] as string[],
    status: 'active' as Property['status'],
    availability: {
      startDate: '',
      endDate: '',
      isAvailable: true,
    },
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
    suspended: 0,
    totalViews: 0,
    totalBookings: 0,
    averageRating: 0,
  });

  const t = translations[lang];
  const isAdmin = userRole === 'admin';

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

  // Load host data
  const loadHostData = useCallback(() => {
    try {
      setLoading(true);
      const data = getHostData(userEmail, userName);
      setHostProfile(data.profile);
      setProperties(data.properties);
      setFilteredProperties(data.properties);
      
      // Set profile form data
      if (data.profile) {
        setProfileFormData({
          name: data.profile.name,
          email: data.profile.email,
          phone: data.profile.phone,
          bio: data.profile.bio || '',
          company: data.profile.company || '',
          language: data.profile.preferences.language,
          currency: data.profile.preferences.currency,
          emailNotifications: data.profile.preferences.notifications.email,
          smsNotifications: data.profile.preferences.notifications.sms,
          pushNotifications: data.profile.preferences.notifications.push,
          bankName: data.profile.bankDetails?.bankName || '',
          accountNumber: data.profile.bankDetails?.accountNumber || '',
          accountHolder: data.profile.bankDetails?.accountHolder || '',
        });
      }
    } catch (error) {
      console.error('Error loading host data:', error);
      toast.error('Failed to load host data');
    } finally {
      setLoading(false);
    }
  }, [userEmail, userName]);

  useEffect(() => {
    loadHostData();
  }, [loadHostData]);

  // Filter properties
  useEffect(() => {
    let filtered = [...properties];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.university.toLowerCase().includes(term) ||
          p.address.district.toLowerCase().includes(term) ||
          p.address.sector.toLowerCase().includes(term) ||
          p.address.village.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((p) => p.type === filterType);
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, filterStatus, filterType]);

  // Update statistics
  useEffect(() => {
    const total = properties.length;
    const active = properties.filter((p) => p.status === 'active').length;
    const pending = properties.filter((p) => p.status === 'pending').length;
    const inactive = properties.filter((p) => p.status === 'inactive').length;
    const suspended = properties.filter((p) => p.status === 'suspended').length;
    const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
    const totalBookings = properties.reduce((sum, p) => sum + p.bookings, 0);
    const avgRating = properties.length > 0 
      ? properties.reduce((sum, p) => sum + p.rating, 0) / properties.length 
      : 0;

    setStats({
      total,
      active,
      pending,
      inactive,
      suspended,
      totalViews,
      totalBookings,
      averageRating: avgRating,
    });
  }, [properties]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'active':
        return t.active;
      case 'pending':
        return t.pending;
      case 'inactive':
        return t.inactive;
      case 'suspended':
        return t.suspended;
      default:
        return status;
    }
  };

  // Get type label
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'apartment':
        return t.apartment;
      case 'house':
        return t.house;
      case 'studio':
        return t.studio;
      case 'room':
        return t.room;
      case 'villa':
        return t.villa;
      default:
        return type;
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

  // Check if user can edit property
  const canEditProperty = (property: Property): boolean => {
    return Boolean(isAdmin) || Boolean(hostProfile && property.hostId === hostProfile.id);
  };

  const canDeleteProperty = (property: Property): boolean => {
    return Boolean(isAdmin) || Boolean(hostProfile && property.hostId === hostProfile.id);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!hostProfile) return;

    setSubmitting(true);  
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProfile: HostProfile = {
        ...hostProfile,
        name: profileFormData.name,
        email: profileFormData.email,
        phone: profileFormData.phone,
        bio: profileFormData.bio,
        company: profileFormData.company,
        preferences: {
          language: profileFormData.language,
          currency: profileFormData.currency,
          notifications: {
            email: profileFormData.emailNotifications,
            sms: profileFormData.smsNotifications,
            push: profileFormData.pushNotifications,
          },
        },
        bankDetails: {
          bankName: profileFormData.bankName,
          accountNumber: profileFormData.accountNumber,
          accountHolder: profileFormData.accountHolder,
        },
        updatedAt: new Date().toISOString(),
      };

      setHostProfile(updatedProfile);
      saveHostData(updatedProfile, properties);
      toast.success(`✅ ${t.profileUpdated}`);
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`❌ ${t.profileUpdateFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle create property
  const handleCreateProperty = async () => {
    if (!hostProfile) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate default dates
      const today = new Date();
      const oneYearLater = new Date(today);
      oneYearLater.setFullYear(today.getFullYear() + 1);

      const newProperty: Property = {
        id: generateId(),
        hostId: hostProfile.id,
        name: propertyFormData.name,
        description: propertyFormData.description,
        images: propertyFormData.images.length > 0 ? propertyFormData.images : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
        address: {
          district: propertyFormData.district,
          sector: propertyFormData.sector,
          cell: propertyFormData.cell,
          village: propertyFormData.village,
        },
        university: propertyFormData.university,
        type: propertyFormData.type,
        bedrooms: propertyFormData.bedrooms,
        bathrooms: propertyFormData.bathrooms,
        maxGuests: propertyFormData.maxGuests,
        pricePerNight: propertyFormData.pricePerNight,
        priceRWF: propertyFormData.priceRWF,
        amenities: propertyFormData.amenities,
        availability: [
          {
            startDate: propertyFormData.availability.startDate || today.toISOString().split('T')[0],
            endDate: propertyFormData.availability.endDate || oneYearLater.toISOString().split('T')[0],
            isAvailable: propertyFormData.availability.isAvailable,
          },
        ],
        status: propertyFormData.status,
        views: 0,
        bookings: 0,
        rating: 0,
        totalReviews: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedProperties = [newProperty, ...properties];
      setProperties(updatedProperties);
      saveHostData(hostProfile, updatedProperties);
      toast.success(`✅ ${t.propertyCreated}`);
      setIsCreateModalOpen(false);
      resetPropertyForm();
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error(`❌ ${t.createFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle update property
  const handleUpdateProperty = async () => {
    if (!selectedProperty || !hostProfile) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProperty: Property = {
        ...selectedProperty,
        name: propertyFormData.name,
        description: propertyFormData.description,
        university: propertyFormData.university,
        type: propertyFormData.type,
        bedrooms: propertyFormData.bedrooms,
        bathrooms: propertyFormData.bathrooms,
        maxGuests: propertyFormData.maxGuests,
        pricePerNight: propertyFormData.pricePerNight,
        priceRWF: propertyFormData.priceRWF,
        address: {
          district: propertyFormData.district,
          sector: propertyFormData.sector,
          cell: propertyFormData.cell,
          village: propertyFormData.village,
        },
        amenities: propertyFormData.amenities,
        images: propertyFormData.images.length > 0 ? propertyFormData.images : selectedProperty.images,
        status: propertyFormData.status,
        updatedAt: new Date().toISOString(),
      };

      const updatedProperties = properties.map((p) =>
        p.id === selectedProperty.id ? updatedProperty : p
      );
      setProperties(updatedProperties);
      saveHostData(hostProfile, updatedProperties);
      toast.success(`✅ ${t.propertyUpdated}`);
      setIsEditModalOpen(false);
      setSelectedProperty(null);
      resetPropertyForm();
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error(`❌ ${t.updateFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete property
  const handleDeleteProperty = async () => {
    if (!selectedProperty || !hostProfile) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedProperties = properties.filter((p) => p.id !== selectedProperty.id);
      setProperties(updatedProperties);
      saveHostData(hostProfile, updatedProperties);
      toast.success(`🗑️ ${t.propertyDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error(`❌ ${t.deleteFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (propertyId: string, newStatus: Property['status']) => {
    if (!isAdmin) {
      toast.warning(t.permissions.adminOnly);
      return;
    }

    try {
      const updatedProperties = properties.map((p) =>
        p.id === propertyId ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
      );
      setProperties(updatedProperties);
      if (hostProfile) saveHostData(hostProfile, updatedProperties);
      toast.success(`✅ Status updated to ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('❌ Failed to update status');
    }
  };

  // Reset property form
  const resetPropertyForm = () => {
    setPropertyFormData({
      name: '',
      description: '',
      university: '',
      type: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      pricePerNight: 0,
      priceRWF: 0,
      district: '',
      sector: '',
      cell: '',
      village: '',
      amenities: [],
      images: [],
      status: 'active',
      availability: {
        startDate: '',
        endDate: '',
        isAvailable: true,
      },
    });
    setAmenityInput('');
    setImageInput('');
  };

  // Add amenity
  const addAmenity = () => {
    if (amenityInput.trim() && !propertyFormData.amenities.includes(amenityInput.trim())) {
      setPropertyFormData({
        ...propertyFormData,
        amenities: [...propertyFormData.amenities, amenityInput.trim()],
      });
      setAmenityInput('');
    }
  };

  // Remove amenity
  const removeAmenity = (amenity: string) => {
    setPropertyFormData({
      ...propertyFormData,
      amenities: propertyFormData.amenities.filter((a) => a !== amenity),
    });
  };

  // Add image
  const addImage = () => {
    if (imageInput.trim() && !propertyFormData.images.includes(imageInput.trim())) {
      setPropertyFormData({
        ...propertyFormData,
        images: [...propertyFormData.images, imageInput.trim()],
      });
      setImageInput('');
    }
  };

  // Remove image
  const removeImage = (image: string) => {
    setPropertyFormData({
      ...propertyFormData,
      images: propertyFormData.images.filter((i) => i !== image),
    });
  };

  // Open modals
  const openProfileModal = () => {
    if (hostProfile) {
      setProfileFormData({
        name: hostProfile.name,
        email: hostProfile.email,
        phone: hostProfile.phone,
        bio: hostProfile.bio || '',
        company: hostProfile.company || '',
        language: hostProfile.preferences.language,
        currency: hostProfile.preferences.currency,
        emailNotifications: hostProfile.preferences.notifications.email,
        smsNotifications: hostProfile.preferences.notifications.sms,
        pushNotifications: hostProfile.preferences.notifications.push,
        bankName: hostProfile.bankDetails?.bankName || '',
        accountNumber: hostProfile.bankDetails?.accountNumber || '',
        accountHolder: hostProfile.bankDetails?.accountHolder || '',
      });
    }
    setIsProfileModalOpen(true);
  };

  const openViewModal = (property: Property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setSelectedProperty(property);
    setPropertyFormData({
      name: property.name,
      description: property.description,
      university: property.university,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      maxGuests: property.maxGuests,
      pricePerNight: property.pricePerNight,
      priceRWF: property.priceRWF,
      district: property.address.district,
      sector: property.address.sector,
      cell: property.address.cell,
      village: property.address.village,
      amenities: property.amenities,
      images: property.images,
      status: property.status,
      availability: property.availability[0] || {
        startDate: '',
        endDate: '',
        isAvailable: true,
      },
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (property: Property) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const openCreateModal = () => {
    resetPropertyForm();
    setIsCreateModalOpen(true);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {t.hostManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageHostProfile}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openProfileModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t.editProfile}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openCreateModal}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {t.addProperty}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {hostProfile && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {hostProfile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{hostProfile.name}</h2>
                {hostProfile.verified && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {t.verified}
                  </span>
                )}
                <span className={`px-2 py-0.5 ${getStatusColor(hostProfile.role === 'admin' ? 'active' : 'pending')} rounded-full text-xs font-medium`}>
                  {hostProfile.role}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                <span>{hostProfile.email}</span>
                <span>•</span>
                <span>{hostProfile.phone}</span>
                <span>•</span>
                <span>{t.memberSince} {formatDate(hostProfile.joinedDate)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{hostProfile.rating.toFixed(1)}</p>
                <p className="text-xs text-gray-500">{t.rating}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{hostProfile.totalReviews}</p>
                <p className="text-xs text-gray-500">{t.totalReviews}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{hostProfile.responseRate}%</p>
                <p className="text-xs text-gray-500">{t.responseRate}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{hostProfile.responseTime}</p>
                <p className="text-xs text-gray-500">{t.responseTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.totalProperties}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.activeProperties}</p>
          <p className="text-xl font-bold text-green-700">{stats.active}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200">
          <p className="text-xs text-yellow-600">{t.pendingProperties}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.inactiveProperties}</p>
          <p className="text-xl font-bold text-gray-900">{stats.inactive}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200">
          <p className="text-xs text-blue-600">{t.totalViews}</p>
          <p className="text-xl font-bold text-blue-700">{stats.totalViews}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
          <p className="text-xs text-purple-600">{t.totalBookings}</p>
          <p className="text-xl font-bold text-purple-700">{stats.totalBookings}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-orange-50 rounded-xl p-3 shadow-sm border border-orange-200">
          <p className="text-xs text-orange-600">{t.rating}</p>
          <p className="text-xl font-bold text-orange-700">{stats.averageRating.toFixed(1)}</p>
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
              placeholder={t.searchProperties}
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
              <option value="active">{t.active}</option>
              <option value="pending">{t.pending}</option>
              <option value="inactive">{t.inactive}</option>
              <option value="suspended">{t.suspended}</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allTypes}</option>
              <option value="apartment">{t.apartment}</option>
              <option value="house">{t.house}</option>
              <option value="studio">{t.studio}</option>
              <option value="room">{t.room}</option>
              <option value="villa">{t.villa}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterType('all');
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

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.property}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.type}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.location}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.price}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p>{t.noProperties}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openViewModal(property)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'}
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {property.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {property.university}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {getTypeLabel(property.type)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{property.address.village}</p>
                      <p className="text-xs text-gray-400">{property.address.district}</p>
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(property.status)}`}>
                            {getStatusLabel(property.status)}
                          </span>
                          <select
                            value={property.status}
                            onChange={(e) => handleStatusUpdate(property.id, e.target.value as Property['status'])}
                            className="px-2 py-1 text-xs border rounded-lg focus:ring-2 focus:ring-[#FF385C] outline-none"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="active">{t.active}</option>
                            <option value="pending">{t.pending}</option>
                            <option value="inactive">{t.inactive}</option>
                            <option value="suspended">{t.suspended}</option>
                          </select>
                        </div>
                      ) : (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(property.status)}`}>
                          {getStatusLabel(property.status)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(property.priceRWF)}
                      </p>
                      <p className="text-xs text-gray-400">per night</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(property);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewProperty}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        {canEditProperty(property) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(property);
                            }}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.editProperty}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </motion.button>
                        )}
                        {canDeleteProperty(property) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(property);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t.deleteProperty}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        )}
                        {!canEditProperty(property) && !canDeleteProperty(property) && !isAdmin && (
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
            {t.showing} {filteredProperties.length} {t.of} {properties.length} {t.propertiesCount}
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && hostProfile && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsProfileModalOpen(false)}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.editProfile}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsProfileModalOpen(false)}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.name} *</label>
                      <input
                        type="text"
                        value={profileFormData.name}
                        onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.email} *</label>
                      <input
                        type="email"
                        value={profileFormData.email}
                        onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.phone} *</label>
                      <input
                        type="text"
                        value={profileFormData.phone}
                        onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.company}</label>
                      <input
                        type="text"
                        value={profileFormData.company}
                        onChange={(e) => setProfileFormData({ ...profileFormData, company: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bio}</label>
                    <textarea
                      value={profileFormData.bio}
                      onChange={(e) => setProfileFormData({ ...profileFormData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.language}</label>
                      <select
                        value={profileFormData.language}
                        onChange={(e) => setProfileFormData({ ...profileFormData, language: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="rw">Kinyarwanda</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.currency}</label>
                      <select
                        value={profileFormData.currency}
                        onChange={(e) => setProfileFormData({ ...profileFormData, currency: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="RWF">RWF</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">{t.notifications}</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profileFormData.emailNotifications}
                          onChange={(e) => setProfileFormData({ ...profileFormData, emailNotifications: e.target.checked })}
                          className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                        />
                        <span className="text-sm text-gray-700">{t.emailNotifications}</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profileFormData.smsNotifications}
                          onChange={(e) => setProfileFormData({ ...profileFormData, smsNotifications: e.target.checked })}
                          className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                        />
                        <span className="text-sm text-gray-700">{t.smsNotifications}</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profileFormData.pushNotifications}
                          onChange={(e) => setProfileFormData({ ...profileFormData, pushNotifications: e.target.checked })}
                          className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                        />
                        <span className="text-sm text-gray-700">{t.pushNotifications}</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">{t.bankName}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bankName}</label>
                        <input
                          type="text"
                          value={profileFormData.bankName}
                          onChange={(e) => setProfileFormData({ ...profileFormData, bankName: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.accountNumber}</label>
                        <input
                          type="text"
                          value={profileFormData.accountNumber}
                          onChange={(e) => setProfileFormData({ ...profileFormData, accountNumber: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.accountHolder}</label>
                      <input
                        type="text"
                        value={profileFormData.accountHolder}
                        onChange={(e) => setProfileFormData({ ...profileFormData, accountHolder: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateProfile}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {t.save}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsProfileModalOpen(false)}
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

      {/* View Property Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedProperty && (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.propertyDetails}</h2>
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
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProperty.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedProperty.name} ${index + 1}`}
                        className={`rounded-lg object-cover h-48 ${index === 0 ? 'col-span-2' : ''}`}
                      />
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.type}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{getTypeLabel(selectedProperty.type)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.status}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedProperty.status)}`}>
                          {getStatusLabel(selectedProperty.status)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.description}</label>
                    <p className="text-sm text-gray-700 mt-1">{selectedProperty.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.bedrooms}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedProperty.bedrooms}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.bathrooms}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedProperty.bathrooms}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.maxGuests}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedProperty.maxGuests}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.location}</label>
                    <div className="mt-1 space-y-1 text-sm text-gray-700">
                      <p>{t.district}: {selectedProperty.address.district}</p>
                      <p>{t.sector}: {selectedProperty.address.sector}</p>
                      <p>{t.cell}: {selectedProperty.address.cell}</p>
                      <p>{t.village}: {selectedProperty.address.village}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.university}</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedProperty.university}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.amenities}</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedProperty.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500">{t.pricePerNight}</label>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(selectedProperty.priceRWF)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Stats</label>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedProperty.views} views • {selectedProperty.bookings} bookings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {canEditProperty(selectedProperty) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsViewModalOpen(false);
                          openEditModal(selectedProperty);
                        }}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        {t.editProperty}
                      </motion.button>
                    )}
                    {canDeleteProperty(selectedProperty) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsViewModalOpen(false);
                          openDeleteModal(selectedProperty);
                        }}
                        className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {t.delete}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ml-auto"
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

      {/* Edit Property Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProperty && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProperty(null);
                resetPropertyForm();
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
                    <h2 className="text-xl font-semibold text-gray-900">{t.editProperty}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedProperty(null);
                      resetPropertyForm();
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.propertyName} *</label>
                    <input
                      type="text"
                      value={propertyFormData.name}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      placeholder={t.enterName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.description} *</label>
                    <textarea
                      value={propertyFormData.description}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.enterDescription}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.university} *</label>
                      <input
                        type="text"
                        value={propertyFormData.university}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, university: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.type} *</label>
                      <select
                        value={propertyFormData.type}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, type: e.target.value as Property['type'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="apartment">{t.apartment}</option>
                        <option value="house">{t.house}</option>
                        <option value="studio">{t.studio}</option>
                        <option value="room">{t.room}</option>
                        <option value="villa">{t.villa}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bedrooms} *</label>
                      <input
                        type="number"
                        value={propertyFormData.bedrooms}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterBedrooms}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bathrooms} *</label>
                      <input
                        type="number"
                        value={propertyFormData.bathrooms}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterBathrooms}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.maxGuests} *</label>
                      <input
                        type="number"
                        value={propertyFormData.maxGuests}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, maxGuests: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterMaxGuests}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.pricePerNight} (USD) *</label>
                      <input
                        type="number"
                        value={propertyFormData.pricePerNight}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, pricePerNight: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                        placeholder={t.enterPrice}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.pricePerNight} (RWF) *</label>
                      <input
                        type="number"
                        value={propertyFormData.priceRWF}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, priceRWF: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.district} *</label>
                      <input
                        type="text"
                        value={propertyFormData.district}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, district: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.sector} *</label>
                      <input
                        type="text"
                        value={propertyFormData.sector}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, sector: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.cell} *</label>
                      <input
                        type="text"
                        value={propertyFormData.cell}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, cell: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.village} *</label>
                      <input
                        type="text"
                        value={propertyFormData.village}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, village: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.amenities}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add amenity..."
                      />
                      <button
                        onClick={addAmenity}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {propertyFormData.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                          {amenity}
                          <button onClick={() => removeAmenity(amenity)} className="hover:text-red-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.images}</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addImage()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Enter image URL..."
                      />
                      <button
                        onClick={addImage}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {propertyFormData.images.map((image) => (
                        <div key={image} className="relative">
                          <img src={image} alt="Property" className="w-16 h-16 object-cover rounded-lg" />
                          <button
                            onClick={() => removeImage(image)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.status}</label>
                    <select
                      value={propertyFormData.status}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, status: e.target.value as Property['status'] })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="active">{t.active}</option>
                      <option value="pending">{t.pending}</option>
                      <option value="inactive">{t.inactive}</option>
                      <option value="suspended">{t.suspended}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.startDate}</label>
                      <input
                        type="date"
                        value={propertyFormData.availability.startDate}
                        onChange={(e) => setPropertyFormData({
                          ...propertyFormData,
                          availability: { ...propertyFormData.availability, startDate: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.endDate}</label>
                      <input
                        type="date"
                        value={propertyFormData.availability.endDate}
                        onChange={(e) => setPropertyFormData({
                          ...propertyFormData,
                          availability: { ...propertyFormData.availability, endDate: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateProperty}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {submitting ? (
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
                        setSelectedProperty(null);
                        resetPropertyForm();
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

      {/* Create Property Modal */}
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
                resetPropertyForm();
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
                    <h2 className="text-xl font-semibold text-gray-900">{t.addProperty}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetPropertyForm();
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.propertyName} *</label>
                    <input
                      type="text"
                      value={propertyFormData.name}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      placeholder={t.enterName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.description} *</label>
                    <textarea
                      value={propertyFormData.description}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.enterDescription}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.university} *</label>
                      <input
                        type="text"
                        value={propertyFormData.university}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, university: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.type} *</label>
                      <select
                        value={propertyFormData.type}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, type: e.target.value as Property['type'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="apartment">{t.apartment}</option>
                        <option value="house">{t.house}</option>
                        <option value="studio">{t.studio}</option>
                        <option value="room">{t.room}</option>
                        <option value="villa">{t.villa}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bedrooms} *</label>
                      <input
                        type="number"
                        value={propertyFormData.bedrooms}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterBedrooms}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.bathrooms} *</label>
                      <input
                        type="number"
                        value={propertyFormData.bathrooms}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterBathrooms}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.maxGuests} *</label>
                      <input
                        type="number"
                        value={propertyFormData.maxGuests}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, maxGuests: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="1"
                        placeholder={t.enterMaxGuests}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.pricePerNight} (USD) *</label>
                      <input
                        type="number"
                        value={propertyFormData.pricePerNight}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, pricePerNight: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                        placeholder={t.enterPrice}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.pricePerNight} (RWF) *</label>
                      <input
                        type="number"
                        value={propertyFormData.priceRWF}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, priceRWF: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.district} *</label>
                      <input
                        type="text"
                        value={propertyFormData.district}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, district: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.sector} *</label>
                      <input
                        type="text"
                        value={propertyFormData.sector}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, sector: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.cell} *</label>
                      <input
                        type="text"
                        value={propertyFormData.cell}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, cell: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.village} *</label>
                      <input
                        type="text"
                        value={propertyFormData.village}
                        onChange={(e) => setPropertyFormData({ ...propertyFormData, village: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.amenities}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add amenity..."
                      />
                      <button
                        onClick={addAmenity}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {propertyFormData.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                          {amenity}
                          <button onClick={() => removeAmenity(amenity)} className="hover:text-red-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.images}</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addImage()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Enter image URL..."
                      />
                      <button
                        onClick={addImage}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {propertyFormData.images.map((image) => (
                        <div key={image} className="relative">
                          <img src={image} alt="Property" className="w-16 h-16 object-cover rounded-lg" />
                          <button
                            onClick={() => removeImage(image)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.status}</label>
                    <select
                      value={propertyFormData.status}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, status: e.target.value as Property['status'] })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="active">{t.active}</option>
                      <option value="pending">{t.pending}</option>
                      <option value="inactive">{t.inactive}</option>
                      <option value="suspended">{t.suspended}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.startDate}</label>
                      <input
                        type="date"
                        value={propertyFormData.availability.startDate}
                        onChange={(e) => setPropertyFormData({
                          ...propertyFormData,
                          availability: { ...propertyFormData.availability, startDate: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.endDate}</label>
                      <input
                        type="date"
                        value={propertyFormData.availability.endDate}
                        onChange={(e) => setPropertyFormData({
                          ...propertyFormData,
                          availability: { ...propertyFormData.availability, endDate: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateProperty}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {submitting ? (
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
                        resetPropertyForm();
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
        {isDeleteModalOpen && selectedProperty && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProperty(null);
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
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{t.deleteProperty}</h3>
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
                        setSelectedProperty(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteProperty}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {submitting ? (
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
    </div>
  );
};