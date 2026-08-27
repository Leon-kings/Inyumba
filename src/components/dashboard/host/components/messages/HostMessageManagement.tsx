/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// ============================================================
// MODAL COMPONENTS
// ============================================================

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
              <svg className="w-10 h-10 text-green-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
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
              <svg className="w-10 h-10 text-red-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                  type === "danger" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ) :
                  type === "warning" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) :
                  type === "success" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
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

// Types
interface MessageAttachment {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

interface HostMessage {
  id: string;
  propertyId: string;
  propertyName: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  subject: string;
  content: string;
  attachments?: MessageAttachment[];
  category: 'inquiry' | 'booking' | 'payment' | 'complaint' | 'feedback' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'read' | 'replied' | 'resolved' | 'archived';
  isRead: boolean;
  isFlagged: boolean;
  isStarred: boolean;
  labels: string[];
  createdAt: string;
  updatedAt: string;
  repliedAt?: string;
  replyContent?: string;
  relatedBookingId?: string;
  tags: string[];
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    pageUrl?: string;
  };
}

interface MessageFormData {
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  subject: string;
  content: string;
  category: HostMessage['category'];
  priority: HostMessage['priority'];
  status: HostMessage['status'];
  labels: string[];
  tags: string[];
  relatedBookingId?: string;
}

// Translations
const translations = {
  en: {
    hostMessages: 'Host Messages',
    manageMessages: 'Manage messages from guests about your properties',
    total: 'Total',
    pending: 'Pending',
    read: 'Read',
    replied: 'Replied',
    resolved: 'Resolved',
    archived: 'Archived',
    flagged: 'Flagged',
    starred: 'Starred',
    searchMessages: 'Search by guest, property, or subject...',
    allStatus: 'All Status',
    allCategories: 'All Categories',
    allPriorities: 'All Priorities',
    message: 'Message',
    guest: 'Guest',
    property: 'Property',
    subject: 'Subject',
    category: 'Category',
    priority: 'Priority',
    status: 'Status',
    received: 'Received',
    actions: 'Actions',
    noMessages: 'No messages found',
    adjustFilters: 'Try adjusting your search or filters',
    showing: 'Showing',
    of: 'of',
    messages: 'messages',
    viewMessage: 'View Message',
    reply: 'Reply',
    deleteMessage: 'Delete Message',
    deleteConfirmation: 'Are you sure you want to delete this message?',
    actionUndone: 'This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',
    messageDeleted: 'Message deleted successfully!',
    deleteFailed: 'Failed to delete message',
    statusUpdated: 'Message status updated successfully!',
    statusUpdateFailed: 'Failed to update message status',
    replySent: 'Reply sent successfully!',
    replyFailed: 'Failed to send reply',
    messageDetails: 'Message Details',
    guestName: 'Guest Name',
    guestEmail: 'Guest Email',
    guestPhone: 'Guest Phone',
    propertyName: 'Property Name',
    messageContent: 'Message Content',
    attachments: 'Attachments',
    replyLabel: 'Reply',
    sendReply: 'Send Reply',
    updateStatus: 'Update Status',
    selectStatus: 'Select Status',
    replyPlaceholder: 'Type your reply here...',
    noAttachments: 'No attachments',
    close: 'Close',
    send: 'Send',
    sending: 'Sending...',
    composeMessage: 'Compose Message',
    newMessage: 'New Message',
    createMessage: 'Create Message',
    messageCreated: 'Message created successfully!',
    createFailed: 'Failed to create message',
    markAsRead: 'Mark as Read',
    markAsUnread: 'Mark as Unread',
    toggleStar: 'Toggle Star',
    toggleFlag: 'Toggle Flag',
    archive: 'Archive',
    unarchive: 'Unarchive',
    labels: 'Labels',
    tags: 'Tags',
    addLabel: 'Add Label',
    addTag: 'Add Tag',
    general: 'General',
    inquiry: 'Inquiry',
    booking: 'Booking',
    payment: 'Payment',
    complaint: 'Complaint',
    feedback: 'Feedback',
    other: 'Other',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    all: 'All',
    selectCategory: 'Select Category',
    selectPriority: 'Select Priority',
    recipient: 'Recipient',
    content: 'Content',
    attachmentsLabel: 'Attachments',
    noImage: 'No image attached',
    viewImage: 'View Image',
    selectProperty: 'Select Property',
    relatedBooking: 'Related Booking',
    permissions: {
      cannotEdit: 'You cannot edit this message',
      cannotDelete: 'You cannot delete this message',
    },
    success: 'Success!',
    error: 'Error',
    confirm: 'Confirm',
  },
  fr: {
    hostMessages: 'Messages des Hôtes',
    manageMessages: 'Gérer les messages des invités concernant vos propriétés',
    total: 'Total',
    pending: 'En Attente',
    read: 'Lu',
    replied: 'Répondu',
    resolved: 'Résolu',
    archived: 'Archivé',
    flagged: 'Signalé',
    starred: 'Favori',
    searchMessages: 'Rechercher par invité, propriété ou sujet...',
    allStatus: 'Tous les Statuts',
    allCategories: 'Toutes les Catégories',
    allPriorities: 'Toutes les Priorités',
    message: 'Message',
    guest: 'Invité',
    property: 'Propriété',
    subject: 'Sujet',
    category: 'Catégorie',
    priority: 'Priorité',
    status: 'Statut',
    received: 'Reçu',
    actions: 'Actions',
    noMessages: 'Aucun message trouvé',
    adjustFilters: 'Essayez d\'ajuster votre recherche ou vos filtres',
    showing: 'Affichage',
    of: 'de',
    messages: 'messages',
    viewMessage: 'Voir le Message',
    reply: 'Répondre',
    deleteMessage: 'Supprimer le Message',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer ce message ?',
    actionUndone: 'Cette action est irréversible.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleting: 'Suppression...',
    messageDeleted: 'Message supprimé avec succès !',
    deleteFailed: 'Échec de la suppression du message',
    statusUpdated: 'Statut du message mis à jour avec succès !',
    statusUpdateFailed: 'Échec de la mise à jour du statut',
    replySent: 'Réponse envoyée avec succès !',
    replyFailed: 'Échec de l\'envoi de la réponse',
    messageDetails: 'Détails du Message',
    guestName: 'Nom de l\'Invité',
    guestEmail: 'Email de l\'Invité',
    guestPhone: 'Téléphone de l\'Invité',
    propertyName: 'Nom de la Propriété',
    messageContent: 'Contenu du Message',
    attachments: 'Pièces Jointes',
    replyLabel: 'Réponse',
    sendReply: 'Envoyer la Réponse',
    updateStatus: 'Mettre à Jour le Statut',
    selectStatus: 'Sélectionner le Statut',
    replyPlaceholder: 'Tapez votre réponse ici...',
    noAttachments: 'Aucune pièce jointe',
    close: 'Fermer',
    send: 'Envoyer',
    sending: 'Envoi en cours...',
    composeMessage: 'Composer un Message',
    newMessage: 'Nouveau Message',
    createMessage: 'Créer un Message',
    messageCreated: 'Message créé avec succès !',
    createFailed: 'Échec de la création du message',
    markAsRead: 'Marquer comme Lu',
    markAsUnread: 'Marquer comme Non Lu',
    toggleStar: 'Basculer Favori',
    toggleFlag: 'Basculer Signalement',
    archive: 'Archiver',
    unarchive: 'Désarchiver',
    labels: 'Étiquettes',
    tags: 'Tags',
    addLabel: 'Ajouter une Étiquette',
    addTag: 'Ajouter un Tag',
    general: 'Général',
    inquiry: 'Demande',
    booking: 'Réservation',
    payment: 'Paiement',
    complaint: 'Réclamation',
    feedback: 'Avis',
    other: 'Autre',
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    urgent: 'Urgent',
    all: 'Tous',
    selectCategory: 'Sélectionner une Catégorie',
    selectPriority: 'Sélectionner une Priorité',
    recipient: 'Destinataire',
    content: 'Contenu',
    attachmentsLabel: 'Pièces Jointes',
    noImage: 'Aucune image jointe',
    viewImage: 'Voir l\'Image',
    selectProperty: 'Sélectionner une Propriété',
    relatedBooking: 'Réservation Associée',
    permissions: {
      cannotEdit: 'Vous ne pouvez pas modifier ce message',
      cannotDelete: 'Vous ne pouvez pas supprimer ce message',
    },
    success: 'Succès !',
    error: 'Erreur',
    confirm: 'Confirmer',
  },
  rw: {
    hostMessages: 'Ubutumwa bw\'Abatambyi',
    manageMessages: 'Gucunga ubutumwa bw\'abashyitsi ku by\'amazu yawe',
    total: 'Yose',
    pending: 'Bitegereje',
    read: 'Byasomwe',
    replied: 'Byasubijwe',
    resolved: 'Byakemutse',
    archived: 'Byabitswe',
    flagged: 'Byashyizwe ikimenyetso',
    starred: 'Byakunzwe',
    searchMessages: 'Shakisha ukurikije umushyitsi, inzu cyangwa ikiganiro...',
    allStatus: 'Ihagaze Ryose',
    allCategories: 'Ibyiciro Byose',
    allPriorities: 'Iby\'ibanze Byose',
    message: 'Ubutumwa',
    guest: 'Umushyitsi',
    property: 'Inzu',
    subject: 'Ikiganiro',
    category: 'Icyiciro',
    priority: 'Iby\'ibanze',
    status: 'Ihagaze',
    received: 'Cyakiriwe',
    actions: 'Ibikorwa',
    noMessages: 'Nta butumwa bwabonetse',
    adjustFilters: 'Gerageza guhindura uburyo ushakisha cyangwa amatungo',
    showing: 'Bereka',
    of: 'muri',
    messages: 'ubutumwa',
    viewMessage: 'Reba Ubutumwa',
    reply: 'Subiza',
    deleteMessage: 'Kuraho Ubutumwa',
    deleteConfirmation: 'Uri kwizera ko ushaka gukuraho ubu butumwa?',
    actionUndone: 'Iki gikorwa ntikishobora guhindurwa.',
    cancel: 'Reka',
    delete: 'Kuraho',
    deleting: 'Birakurwaho...',
    messageDeleted: 'Ubutumwa bwakuweho neza!',
    deleteFailed: 'Kuraho ubutumwa birananiranye',
    statusUpdated: 'Ihagaze ry\'ubutumwa ryavuguruwe neza!',
    statusUpdateFailed: 'Kuvugurura ihagaze birananiranye',
    replySent: 'Igisubizo cyoherejwe neza!',
    replyFailed: 'Kohereza igisubizo birananiranye',
    messageDetails: 'Ibisobanuro by\'Ubutumwa',
    guestName: 'Izina ry\'Umushyitsi',
    guestEmail: 'Imeri y\'Umushyitsi',
    guestPhone: 'Telefone y\'Umushyitsi',
    propertyName: 'Izina ry\'Inzu',
    messageContent: 'Ibirimo mu Butumwa',
    attachments: 'Ibishushanyo',
    replyLabel: 'Igisubizo',
    sendReply: 'Ohereza Igisubizo',
    updateStatus: 'Vugurura Ihagaze',
    selectStatus: 'Hitamo Ihagaze',
    replyPlaceholder: 'Andika igisubizo cyawe hano...',
    noAttachments: 'Nta bishushanyo',
    close: 'Funga',
    send: 'Ohereza',
    sending: 'Biremereza...',
    composeMessage: 'Andika Ubutumwa',
    newMessage: 'Ubutumwa Bushya',
    createMessage: 'Kora Ubutumwa',
    messageCreated: 'Ubutumwa bwakozwe neza!',
    createFailed: 'Kora ubutumwa birananiranye',
    markAsRead: 'Shyira nk\'Uwasomye',
    markAsUnread: 'Shyira nk\'Utarasomye',
    toggleStar: 'Hindura Ibyakunzwe',
    toggleFlag: 'Hindura Ikimenyetso',
    archive: 'Bika',
    unarchive: 'Kuraho mu bibitswe',
    labels: 'Ibyiciro',
    tags: 'Ibimenyetso',
    addLabel: 'Ongeraho Icyiciro',
    addTag: 'Ongeraho Ikimenyetso',
    general: 'Rusange',
    inquiry: 'Ikibazo',
    booking: 'Icyemezo',
    payment: 'Ubwishyu',
    complaint: 'Ikirego',
    feedback: 'Ibitekerezo',
    other: 'Ibindi',
    low: 'Gito',
    medium: 'Rishoboka',
    high: 'Kinini',
    urgent: 'Byihutirwa',
    all: 'Byose',
    selectCategory: 'Hitamo Icyiciro',
    selectPriority: 'Hitamo Iby\'ibanze',
    recipient: 'Uwakiriye',
    content: 'Ibirimo',
    attachmentsLabel: 'Ibishushanyo',
    noImage: 'Nta shusho yashyizweho',
    viewImage: 'Reba Ishusho',
    selectProperty: 'Hitamo Inzu',
    relatedBooking: 'Icyemezo Gifitanye Isano',
    permissions: {
      cannotEdit: 'Ntushobora guhindura ubu butumwa',
      cannotDelete: 'Ntushobora gukuraho ubu butumwa',
    },
    success: 'Byakunze!',
    error: 'Ikosa',
    confirm: 'Emeza',
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

// Storage key
const STORAGE_KEY_HOST_MESSAGES = 'host_messages';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Initial messages for host
const getInitialMessages = (_: string): HostMessage[] => {
  return [
    {
      id: '1',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      guestId: 'guest_001',
      guestName: 'Jean Paul Mugisha',
      guestEmail: 'jean@example.com',
      guestPhone: '+250788123456',
      subject: 'Inquiry about room availability',
      content: 'Hello, I am interested in booking a room at your property for the upcoming semester. Do you have any rooms available for February 2024? I would like a room with a study desk.',
      category: 'inquiry',
      priority: 'medium',
      status: 'pending',
      isRead: false,
      isFlagged: true,
      isStarred: false,
      labels: ['availability', 'semester'],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      tags: ['student', 'long-term'],
      metadata: {},
    },
    {
      id: '2',
      propertyId: 'prop_002',
      propertyName: 'Kigombe Student Apartments',
      guestId: 'guest_002',
      guestName: 'Marie Claire Uwimana',
      guestEmail: 'marie@example.com',
      guestPhone: '+250788123457',
      subject: 'Booking confirmation needed',
      content: 'I made a booking for 3 months starting February 15th. Can you please confirm the booking and send me the payment details?',
      category: 'booking',
      priority: 'high',
      status: 'replied',
      isRead: true,
      isFlagged: false,
      isStarred: true,
      labels: ['confirmation', 'payment'],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
      repliedAt: new Date(Date.now() - 43200000).toISOString(),
      replyContent: 'Hi Marie, your booking has been confirmed. Please check your email for payment details.',
      tags: ['booking', 'urgent'],
      metadata: {},
    },
    {
      id: '3',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      guestId: 'guest_003',
      guestName: 'David Niyonzima',
      guestEmail: 'david@example.com',
      guestPhone: '+250788123458',
      subject: 'Feedback on the property',
      content: 'I stayed at your property for 2 weeks and I wanted to share that I had a great experience. The room was clean and the staff were friendly.',
      category: 'feedback',
      priority: 'low',
      status: 'read',
      isRead: true,
      isFlagged: false,
      isStarred: false,
      labels: ['positive', 'review'],
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      tags: ['feedback', 'positive'],
      metadata: {},
    },
  ];
};

// Helper functions
const getMessages = (hostEmail: string): HostMessage[] => {
  const data = localStorage.getItem(STORAGE_KEY_HOST_MESSAGES);
  if (data) {
    const allMessages = JSON.parse(data);
    return allMessages;
  }
  const initialMessages = getInitialMessages(hostEmail);
  localStorage.setItem(STORAGE_KEY_HOST_MESSAGES, JSON.stringify(initialMessages));
  return initialMessages;
};

const saveMessages = (messages: HostMessage[]): void => {
  localStorage.setItem(STORAGE_KEY_HOST_MESSAGES, JSON.stringify(messages));
};

export const HostMessageManagement: React.FC = () => {
  // Get language and user info from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const userRole = getUserRole();
  const userEmail = getUserEmail();

  const [messages, setMessages] = useState<HostMessage[]>(getMessages(userEmail));
  const [filteredMessages, setFilteredMessages] = useState<HostMessage[]>(getMessages(userEmail));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<HostMessage | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

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

  // Compose form state
  const [formData, setFormData] = useState<MessageFormData>({
    propertyId: '',
    propertyName: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    subject: '',
    content: '',
    category: 'general',
    priority: 'medium',
    status: 'pending',
    labels: [],
    tags: [],
    relatedBookingId: '',
  });
  const [labelInput, setLabelInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  // Properties for dropdown
  const [hostProperties] = useState<{id: string; name: string}[]>([
    { id: 'prop_001', name: 'INES Ruhengeri Student Lodge' },
    { id: 'prop_002', name: 'Kigombe Student Apartments' },
  ]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0,
    resolved: 0,
    archived: 0,
    flagged: 0,
    starred: 0,
  });

  const t = translations[lang];
  const isHost = userRole === 'host' || userRole === 'admin';

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
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

  // Refresh messages
  useEffect(() => {
    const refreshed = getMessages(userEmail);
    setMessages(refreshed);
  }, [userEmail]);

  // Filter messages
  useEffect(() => {
    let filtered = [...messages];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(term) ||
          msg.guestName.toLowerCase().includes(term) ||
          msg.content.toLowerCase().includes(term) ||
          msg.guestEmail.toLowerCase().includes(term) ||
          msg.propertyName.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((msg) => msg.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((msg) => msg.category === filterCategory);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((msg) => msg.priority === filterPriority);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus, filterCategory, filterPriority]);

  // Update statistics
  useEffect(() => {
    const total = messages.length;
    const pending = messages.filter((m) => m.status === 'pending').length;
    const read = messages.filter((m) => m.status === 'read').length;
    const replied = messages.filter((m) => m.status === 'replied').length;
    const resolved = messages.filter((m) => m.status === 'resolved').length;
    const archived = messages.filter((m) => m.status === 'archived').length;
    const flagged = messages.filter((m) => m.isFlagged).length;
    const starred = messages.filter((m) => m.isStarred).length;

    setStats({ total, pending, read, replied, resolved, archived, flagged, starred });
  }, [messages]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800';
      case 'archived':
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
      case 'read':
        return t.read;
      case 'replied':
        return t.replied;
      case 'resolved':
        return t.resolved;
      case 'archived':
        return t.archived;
      default:
        return status;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'general':
        return 'bg-gray-100 text-gray-800';
      case 'inquiry':
        return 'bg-blue-100 text-blue-800';
      case 'booking':
        return 'bg-purple-100 text-purple-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'complaint':
        return 'bg-red-100 text-red-800';
      case 'feedback':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // CRUD Operations
  const handleCreateMessage = async () => {
    if (!formData.guestName || !formData.guestEmail || !formData.subject || !formData.content) {
      showErrorModal(t.error || 'Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newMessage: HostMessage = {
        id: generateId(),
        propertyId: formData.propertyId,
        propertyName: formData.propertyName || 'Unknown Property',
        guestId: `guest_${Date.now()}`,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        subject: formData.subject,
        content: formData.content,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        isRead: false,
        isFlagged: false,
        isStarred: false,
        labels: formData.labels,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: formData.tags,
        relatedBookingId: formData.relatedBookingId,
        metadata: {},
      };

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);

      showSuccessModal(
        t.success || 'Success!',
        t.messageCreated || 'Message created successfully!',
        `Message sent to ${newMessage.guestName}`
      );
      resetForm();
      setIsComposeModalOpen(false);
    } catch (error) {
      showErrorModal(t.error || 'Error', t.createFailed || 'Failed to create message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedMessages = messages.filter((m) => m.id !== selectedMessage.id);
      setMessages(updatedMessages);
      saveMessages(updatedMessages);

      showSuccessModal(
        t.success || 'Success!',
        t.messageDeleted || 'Message deleted successfully!',
        `Message from ${selectedMessage.guestName} has been removed`
      );
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      showErrorModal(t.error || 'Error', t.deleteFailed || 'Failed to delete message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      showErrorModal(t.error || 'Error', 'Please enter a reply');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedMessage: HostMessage = {
        ...selectedMessage,
        status: selectedStatus as HostMessage['status'] || 'replied',
        replyContent: replyContent,
        repliedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedMessages = messages.map((m) =>
        m.id === selectedMessage.id ? updatedMessage : m
      );
      setMessages(updatedMessages);
      saveMessages(updatedMessages);

      showSuccessModal(
        t.success || 'Success!',
        t.replySent || 'Reply sent successfully!',
        `Reply sent to ${selectedMessage.guestName}`
      );
      setIsReplyModalOpen(false);
      setSelectedMessage(null);
      setReplyContent('');
    } catch (error) {
      showErrorModal(t.error || 'Error', t.replyFailed || 'Failed to send reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (messageId: string, newStatus: HostMessage['status']) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedMessages = messages.map((m) =>
        m.id === messageId
          ? { ...m, status: newStatus, updatedAt: new Date().toISOString() }
          : m
      );
      setMessages(updatedMessages);
      saveMessages(updatedMessages);

      showSuccessModal(t.success || 'Success!', t.statusUpdated || 'Message status updated successfully!');
    } catch (error) {
      showErrorModal(t.error || 'Error', t.statusUpdateFailed || 'Failed to update message status');
    }
  };

  const handleToggleStar = async (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    try {
      const updatedMessages = messages.map((m) =>
        m.id === messageId
          ? { ...m, isStarred: !m.isStarred, updatedAt: new Date().toISOString() }
          : m
      );
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch {
      // Silently handle error
    }
  };

  const handleToggleFlag = async (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    try {
      const updatedMessages = messages.map((m) =>
        m.id === messageId
          ? { ...m, isFlagged: !m.isFlagged, updatedAt: new Date().toISOString() }
          : m
      );
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch {
      // Silently handle error
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const updatedMessages = messages.map((m) =>
        m.id === messageId
          ? { ...m, isRead: true, status: m.status === 'pending' ? 'read' : m.status, updatedAt: new Date().toISOString() }
          : m
      );
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch {
      // Silently handle error
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
      subject: '',
      content: '',
      category: 'general',
      priority: 'medium',
      status: 'pending',
      labels: [],
      tags: [],
      relatedBookingId: '',
    });
    setLabelInput('');
    setTagInput('');
  };

  // Add label
  const addLabel = () => {
    if (labelInput.trim() && !formData.labels.includes(labelInput.trim())) {
      setFormData({
        ...formData,
        labels: [...formData.labels, labelInput.trim()],
      });
      setLabelInput('');
    }
  };

  // Remove label
  const removeLabel = (label: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((l) => l !== label),
    });
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // Open modals
  const openViewModal = (message: HostMessage) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const openReplyModal = (message: HostMessage) => {
    setSelectedMessage(message);
    setReplyContent('');
    setSelectedStatus(message.status);
    setIsReplyModalOpen(true);
  };

  const openDeleteModal = (message: HostMessage) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const openComposeModal = () => {
    resetForm();
    setIsComposeModalOpen(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    const refreshed = getMessages(userEmail);
    setMessages(refreshed);
    showSuccessModal(t.success || 'Success!', 'Messages refreshed!');
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

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-7 h-7 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.hostMessages}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t.manageMessages}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openComposeModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {t.composeMessage}
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
          <p className="text-xs text-blue-600">{t.read}</p>
          <p className="text-xl font-bold text-blue-700">{stats.read}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.replied}</p>
          <p className="text-xl font-bold text-green-700">{stats.replied}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-emerald-50 rounded-xl p-3 shadow-sm border border-emerald-200">
          <p className="text-xs text-emerald-600">{t.resolved}</p>
          <p className="text-xl font-bold text-emerald-700">{stats.resolved}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
          <p className="text-xs text-red-600">{t.flagged}</p>
          <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
          <p className="text-xs text-purple-600">{t.starred}</p>
          <p className="text-xl font-bold text-purple-700">{stats.starred}</p>
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
              placeholder={t.searchMessages}
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
              <option value="read">{t.read}</option>
              <option value="replied">{t.replied}</option>
              <option value="resolved">{t.resolved}</option>
              <option value="archived">{t.archived}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allCategories}</option>
              <option value="general">{t.general}</option>
              <option value="inquiry">{t.inquiry}</option>
              <option value="booking">{t.booking}</option>
              <option value="payment">{t.payment}</option>
              <option value="complaint">{t.complaint}</option>
              <option value="feedback">{t.feedback}</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allPriorities}</option>
              <option value="low">{t.low}</option>
              <option value="medium">{t.medium}</option>
              <option value="high">{t.high}</option>
              <option value="urgent">{t.urgent}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterCategory('all');
                setFilterPriority('all');
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

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>{t.message}</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.guest}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.property}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.category}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.received}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>{t.noMessages}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <motion.tr
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                    onClick={() => openViewModal(message)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center gap-1">
                          {message.isStarred && (
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {message.isFlagged && (
                            <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 01-1-1V6z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate md:hidden">
                            {message.guestName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{message.guestName}</p>
                      <p className="text-xs text-gray-400">{message.guestEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{message.propertyName}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}>
                          {getStatusLabel(message.status)}
                        </span>
                        {message.priority === 'urgent' && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 animate-pulse">
                            Urgent
                          </span>
                        )}
                      </div>
                      {!message.isRead && (
                        <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{formatDate(message.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(message);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewMessage}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openReplyModal(message);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.reply}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStar(message.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isStarred ? 'text-yellow-400 hover:bg-yellow-50' : 'text-gray-400 hover:bg-yellow-50'}`}
                          title={t.toggleStar}
                        >
                          <svg className="w-4 h-4" fill={message.isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFlag(message.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isFlagged ? 'text-red-400 hover:bg-red-50' : 'text-gray-400 hover:bg-red-50'}`}
                          title={t.toggleFlag}
                        >
                          <svg className="w-4 h-4" fill={message.isFlagged ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(message);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteMessage}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
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
            {t.showing} {filteredMessages.length} {t.of} {messages.length} {t.messages}
          </p>
        </div>
      </div>

      {/* View Message Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMessage && (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.messageDetails}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStar(selectedMessage.id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isStarred ? (
                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFlag(selectedMessage.id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isFlagged ? (
                        <svg className="w-5 h-5 text-red-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 01-1-1V6z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      )}
                    </motion.button>
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
                </div>

                <div className="p-6 space-y-4">
                  {/* Message Header */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.guestName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestEmail}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.guestEmail}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.propertyName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.propertyName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.category}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}>
                          {selectedMessage.category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.priority}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                          {selectedMessage.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.subject}</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.messageContent}</label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
                    </div>
                  </div>

                  {/* Labels & Tags */}
                  {selectedMessage.labels.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.labels}</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedMessage.labels.map((label) => (
                          <span key={label} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMessage.tags.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.tags}</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedMessage.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Section */}
                  {selectedMessage.replyContent && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <label className="text-xs font-medium text-gray-500">{t.replyLabel}</label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.replyContent}</p>
                        {selectedMessage.repliedAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Replied on {formatDate(selectedMessage.repliedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openReplyModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {t.reply}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const newStatus = selectedMessage.status === 'archived' ? 'read' : 'archived';
                        handleUpdateStatus(selectedMessage.id, newStatus as HostMessage['status']);
                        setIsViewModalOpen(false);
                      }}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {selectedMessage.status === 'archived' ? t.unarchive : t.archive}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openDeleteModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t.delete}
                    </motion.button>
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

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedMessage && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsReplyModalOpen(false)}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.reply} - {selectedMessage.subject}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsReplyModalOpen(false);
                      setReplyContent('');
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Original Message Preview */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span> {selectedMessage.guestName} ({selectedMessage.guestEmail})
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Property:</span> {selectedMessage.propertyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Subject:</span> {selectedMessage.subject}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {selectedMessage.content}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.updateStatus}
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="read">{t.read}</option>
                      <option value="replied">{t.replied}</option>
                      <option value="resolved">{t.resolved}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  {/* Reply Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.replyLabel}
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.replyPlaceholder}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendReply}
                      disabled={isSubmitting || !replyContent.trim()}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !replyContent.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {t.sendReply}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsReplyModalOpen(false);
                        setReplyContent('');
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
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMessage(null);
        }}
        onConfirm={handleDeleteMessage}
        title={t.deleteMessage}
        message={t.deleteConfirmation}
        confirmText={t.delete}
        cancelText={t.cancel}
        isSubmitting={isLoading}
        type="danger"
        icon={
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
      />

      {/* Compose Message Modal */}
      <AnimatePresence>
        {isComposeModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsComposeModalOpen(false);
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.newMessage}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsComposeModalOpen(false);
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
                        {t.guestEmail} *
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.subject} *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.content} *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={5}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.category}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as HostMessage['category'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="general">{t.general}</option>
                        <option value="inquiry">{t.inquiry}</option>
                        <option value="booking">{t.booking}</option>
                        <option value="payment">{t.payment}</option>
                        <option value="complaint">{t.complaint}</option>
                        <option value="feedback">{t.feedback}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.priority}
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as HostMessage['priority'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="low">{t.low}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="high">{t.high}</option>
                        <option value="urgent">{t.urgent}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.status}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as HostMessage['status'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="read">{t.read}</option>
                        <option value="replied">{t.replied}</option>
                        <option value="resolved">{t.resolved}</option>
                        <option value="archived">{t.archived}</option>
                      </select>
                    </div>
                  </div>

                  {/* Labels */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.labels}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={labelInput}
                        onChange={(e) => setLabelInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addLabel()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add a label..."
                      />
                      <button
                        onClick={addLabel}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.labels.map((label) => (
                        <span key={label} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                          {label}
                          <button onClick={() => removeLabel(label)} className="hover:text-red-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.tags}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={addTag}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                          #{tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateMessage}
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
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {t.createMessage}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsComposeModalOpen(false);
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