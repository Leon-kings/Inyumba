/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Types
interface Request {
  id: string;
  name: string;
  email: string;
  message: string;
  image?: {
    name: string;
    size: number;
    type: string;
    dataUrl: string;
  };
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
  response?: string;
  respondedBy?: string;
}

interface RequestFormData {
  name: string;
  email: string;
  message: string;
  image?: File | null;
  imagePreview?: string;
}

// Translations
const translations = {
  en: {
    myRequests: "My Requests",
    manageRequests: "Create and manage your support requests",
    newRequest: "New Request",
    editRequest: "Edit Request",
    viewRequest: "View Request",
    deleteRequest: "Delete Request",
    deleteConfirmation: "Are you sure you want to delete this request?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    requestDeleted: "Request deleted successfully!",
    deleteFailed: "Failed to delete request",
    requestCreated: "Request created successfully!",
    requestUpdated: "Request updated successfully!",
    createFailed: "Failed to create request",
    updateFailed: "Failed to update request",
    total: "Total",
    pending: "Pending",
    reviewing: "Reviewing",
    resolved: "Resolved",
    rejected: "Rejected",
    searchRequests: "Search your requests...",
    allStatus: "All Status",
    request: "Request",
    requester: "Requester",
    message: "Message",
    status: "Status",
    submitted: "Submitted",
    actions: "Actions",
    noRequests: "No requests found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    requests: "requests",
    respond: "Respond",
    requestDetails: "Request Details",
    requesterName: "Requester Name",
    requesterEmail: "Requester Email",
    requestMessage: "Request Message",
    attachedImage: "Attached Image",
    responseLabel: "Response",
    sendResponse: "Send Response",
    responsePlaceholder: "Type your response here...",
    noImage: "No image attached",
    viewImage: "View Image",
    close: "Close",
    send: "Send",
    sending: "Sending...",
    createRequest: "Create Request",
    updateRequest: "Update Request",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    attachImage: "Attach Image (optional)",
    imageRequirements: "JPG, PNG, GIF up to 5MB",
    statuses: {
      pending: "Pending",
      reviewing: "Reviewing",
      resolved: "Resolved",
      rejected: "Rejected",
    },
    filters: {
      all: "All Status",
      pending: "Pending",
      reviewing: "Reviewing",
      resolved: "Resolved",
      rejected: "Rejected",
    },
    role: {
      user: "User",
      admin: "Admin",
      host: "Host",
    },
    permissions: {
      adminOnly: "Only admins can change request status",
      cannotEdit: "You cannot edit this request",
      cannotDelete: "You cannot delete this request",
    },
  },
  fr: {
    myRequests: "Mes Demandes",
    manageRequests: "Créez et gérez vos demandes de support",
    newRequest: "Nouvelle Demande",
    editRequest: "Modifier la Demande",
    viewRequest: "Voir la Demande",
    deleteRequest: "Supprimer la Demande",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette demande ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    requestDeleted: "Demande supprimée avec succès !",
    deleteFailed: "Échec de la suppression de la demande",
    requestCreated: "Demande créée avec succès !",
    requestUpdated: "Demande mise à jour avec succès !",
    createFailed: "Échec de la création de la demande",
    updateFailed: "Échec de la mise à jour de la demande",
    total: "Total",
    pending: "En Attente",
    reviewing: "En Révision",
    resolved: "Résolu",
    rejected: "Rejeté",
    searchRequests: "Rechercher vos demandes...",
    allStatus: "Tous les Statuts",
    request: "Demande",
    requester: "Demandeur",
    message: "Message",
    status: "Statut",
    submitted: "Soumis",
    actions: "Actions",
    noRequests: "Aucune demande trouvée",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    requests: "demandes",
    respond: "Répondre",
    requestDetails: "Détails de la Demande",
    requesterName: "Nom du Demandeur",
    requesterEmail: "Email du Demandeur",
    requestMessage: "Message de la Demande",
    attachedImage: "Image Jointe",
    responseLabel: "Réponse",
    sendResponse: "Envoyer la Réponse",
    responsePlaceholder: "Tapez votre réponse ici...",
    noImage: "Aucune image jointe",
    viewImage: "Voir l'Image",
    close: "Fermer",
    send: "Envoyer",
    sending: "Envoi en cours...",
    createRequest: "Créer une Demande",
    updateRequest: "Mettre à Jour la Demande",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    yourMessage: "Votre Message",
    attachImage: "Joindre une Image (optionnel)",
    imageRequirements: "JPG, PNG, GIF jusqu'à 5MB",
    statuses: {
      pending: "En Attente",
      reviewing: "En Révision",
      resolved: "Résolu",
      rejected: "Rejeté",
    },
    filters: {
      all: "Tous les Statuts",
      pending: "En Attente",
      reviewing: "En Révision",
      resolved: "Résolu",
      rejected: "Rejeté",
    },
    role: {
      user: "Utilisateur",
      admin: "Administrateur",
      host: "Hôte",
    },
    permissions: {
      adminOnly: "Seuls les administrateurs peuvent changer le statut",
      cannotEdit: "Vous ne pouvez pas modifier cette demande",
      cannotDelete: "Vous ne pouvez pas supprimer cette demande",
    },
  },
  rw: {
    myRequests: "Ibyifuzo Byanjye",
    manageRequests: "Kora kandi ucunge ibyifuzo byawe",
    newRequest: "Icyifuzo Gishya",
    editRequest: "Hindura Icyifuzo",
    viewRequest: "Reba Icyifuzo",
    deleteRequest: "Kuraho Icyifuzo",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyifuzo?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    requestDeleted: "Icyifuzo cyakuweho neza!",
    deleteFailed: "Kuraho icyifuzo birananiranye",
    requestCreated: "Icyifuzo cyakozwe neza!",
    requestUpdated: "Icyifuzo cyavuguruwe neza!",
    createFailed: "Kora icyifuzo birananiranye",
    updateFailed: "Kuvugurura icyifuzo birananiranye",
    total: "Yose",
    pending: "Bitegereje",
    reviewing: "Birisuzumwa",
    resolved: "Byakemutse",
    rejected: "Byangijwe",
    searchRequests: "Shakisha ibyifuzo byawe...",
    allStatus: "Ihagaze Ryose",
    request: "Icyifuzo",
    requester: "Usabye",
    message: "Ubutumwa",
    status: "Ihagaze",
    submitted: "Byoherejwe",
    actions: "Ibikorwa",
    noRequests: "Nta cyifuzo cyabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    requests: "ibyifuzo",
    respond: "Subiza",
    requestDetails: "Ibisobanuro by'Icyifuzo",
    requesterName: "Izina ry'Usabye",
    requesterEmail: "Imeri y'Usabye",
    requestMessage: "Ubutumwa bw'Icyifuzo",
    attachedImage: "Ishusho Yashyizweho",
    responseLabel: "Igisubizo",
    sendResponse: "Ohereza Igisubizo",
    responsePlaceholder: "Andika igisubizo cyawe hano...",
    noImage: "Nta shusho yashyizweho",
    viewImage: "Reba Ishusho",
    close: "Funga",
    send: "Ohereza",
    sending: "Biremereza...",
    createRequest: "Kora Icyifuzo",
    updateRequest: "Vugurura Icyifuzo",
    yourName: "Izina Ryawe",
    yourEmail: "Imeri Yawe",
    yourMessage: "Ubutumwa Bwawe",
    attachImage: "Shyiramo Ishusho (ntibishoboka)",
    imageRequirements: "JPG, PNG, GIF kugeza 5MB",
    statuses: {
      pending: "Bitegereje",
      reviewing: "Birisuzumwa",
      resolved: "Byakemutse",
      rejected: "Byangijwe",
    },
    filters: {
      all: "Ihagaze Ryose",
      pending: "Bitegereje",
      reviewing: "Birisuzumwa",
      resolved: "Byakemutse",
      rejected: "Byangijwe",
    },
    role: {
      user: "Umukoresha",
      admin: "Muyobozi",
      host: "Umutambyi",
    },
    permissions: {
      adminOnly: "Abayobozi gusa nibo bashobora guhindura ihagaze",
      cannotEdit: "Ntushobora guhindura iki cyifuzo",
      cannotDelete: "Ntushobora gukuraho iki cyifuzo",
    },
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to get user role from cookies
const getUserRole = (): "admin" | "user" | "host" => {
  const role = Cookies.get("userRole") as "admin" | "user" | "host";
  return role || "user";
};

// Helper function to get user email from cookies
const getUserEmail = (): string => {
  return Cookies.get("userEmail") || "";
};

// Helper function to get user name from cookies
const getUserName = (): string => {
  return Cookies.get("userName") || "";
};

// Mock API functions (replace with actual API calls)
const mockGetUserRequests = async (email: string): Promise<Request[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return mock data for demonstration
  return [
    {
      id: "1",
      name: "John Doe",
      email: email || "john@example.com",
      message: "I need help with finding accommodation near the university.",
      status: "pending",
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "2",
      name: "John Doe",
      email: email || "john@example.com",
      message: "How can I list my property on the platform?",
      status: "reviewing",
      createdAt: "2024-01-18T14:30:00Z",
      updatedAt: "2024-01-19T09:00:00Z",
      response: "We are reviewing your request. Please wait for our response.",
      respondedBy: "Admin User",
    },
  ];
};

const mockCreateRequest = async (data: Partial<Request>): Promise<Request> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    id: Date.now().toString(),
    name: data.name || "",
    email: data.email || "",
    message: data.message || "",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: data.image,
  };
};

const mockUpdateRequest = async (
  _id: string,
  data: Partial<Request>,
): Promise<Request> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: _id,
    name: data.name || "",
    email: data.email || "",
    message: data.message || "",
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: data.image,
    response: data.response,
    respondedBy: data.respondedBy,
  };
};

const mockDeleteRequest = async (
  _id: string,
): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
};

export const UserRequestManagement: React.FC = () => {
  // Get language and user info from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const userRole = getUserRole();
  const userEmail = getUserEmail();
  const userName = getUserName();

  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  // Form state for create/edit
  const [formData, setFormData] = useState<RequestFormData>({
    name: userName || "",
    email: userEmail || "",
    message: "",
    image: null,
    imagePreview: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    image?: string;
  }>({});

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewing: 0,
    resolved: 0,
    rejected: 0,
  });

  const t = translations[lang];
  const isAdmin = userRole === "admin";

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

  // Load user requests
  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mockGetUserRequests(userEmail);
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error("Error loading requests:", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Filter requests
  useEffect(() => {
    let filtered = [...requests];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(term) ||
          req.email.toLowerCase().includes(term) ||
          req.message.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, filterStatus]);

  // Update statistics
  useEffect(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const reviewing = requests.filter((r) => r.status === "reviewing").length;
    const resolved = requests.filter((r) => r.status === "resolved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;

    setStats({ total, pending, reviewing, resolved, rejected });
  }, [requests]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "pending":
        return t.statuses.pending;
      case "reviewing":
        return t.statuses.reviewing;
      case "resolved":
        return t.statuses.resolved;
      case "rejected":
        return t.statuses.rejected;
      default:
        return status;
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and GIF images are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: file,
        imagePreview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle create request
  const handleCreateRequest = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const newRequest = await mockCreateRequest({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        image: formData.image
          ? {
              name: formData.image.name,
              size: formData.image.size,
              type: formData.image.type,
              dataUrl: formData.imagePreview || "",
            }
          : undefined,
      });

      setRequests([newRequest, ...requests]);
      toast.success(`✅ ${t.requestCreated}`);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error(`❌ ${t.createFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle update request
  const handleUpdateRequest = async () => {
    if (!selectedRequest || !validateForm()) return;

    setSubmitting(true);
    try {
      const updated = await mockUpdateRequest(selectedRequest.id, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        image: formData.image
          ? {
              name: formData.image.name,
              size: formData.image.size,
              type: formData.image.type,
              dataUrl: formData.imagePreview || "",
            }
          : selectedRequest.image,
      });

      setRequests(
        requests.map((r) => (r.id === selectedRequest.id ? updated : r)),
      );
      toast.success(`✅ ${t.requestUpdated}`);
      setIsEditModalOpen(false);
      setSelectedRequest(null);
      resetForm();
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error(`❌ ${t.updateFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete request
  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setSubmitting(true);
    try {
      await mockDeleteRequest(selectedRequest.id);
      setRequests(requests.filter((r) => r.id !== selectedRequest.id));
      toast.success(`🗑️ ${t.requestDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error(`❌ ${t.deleteFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    toast.info("Refreshing requests...");
    setTimeout(() => {
      loadRequests();
      toast.success("Requests refreshed!");
    }, 800);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: userName || "",
      email: userEmail || "",
      message: "",
      image: null,
      imagePreview: "",
    });
    setFormErrors({});
  };

  // Open edit modal
  const openEditModal = (request: Request) => {
    setSelectedRequest(request);
    setFormData({
      name: request.name,
      email: request.email,
      message: request.message,
      image: null,
      imagePreview: request.image?.dataUrl || "",
    });
    setIsEditModalOpen(true);
  };

  // Open view modal
  const openViewModal = (request: Request) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (request: Request) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  // Check if user can edit request
  const canEditRequest = (request: Request): boolean => {
    return (
      isAdmin || (request.email === userEmail && request.status === "pending")
    );
  };

  // Check if user can delete request
  const canDeleteRequest = (request: Request): boolean => {
    return (
      isAdmin || (request.email === userEmail && request.status === "pending")
    );
  };

  // Handle status change (admin only)
  const handleStatusChange = async (
    request: Request,
    newStatus: Request["status"],
  ) => {
    if (!isAdmin) {
      toast.warning(t.permissions.adminOnly);
      return;
    }

    try {
      const updated = await mockUpdateRequest(request.id, {
        status: newStatus,
      });
      setRequests(requests.map((r) => (r.id === request.id ? updated : r)));
      toast.success(`✅ Status updated to ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(`❌ Failed to update status`);
    }
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
              <svg
                className="w-7 h-7 text-[#FF385C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              {t.myRequests}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageRequests}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors text-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t.newRequest}
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <svg
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.reviewing}</p>
          <p className="text-2xl font-bold text-blue-700">{stats.reviewing}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.resolved}</p>
          <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">{t.rejected}</p>
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
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
              placeholder={t.searchRequests}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.filters.all}</option>
              <option value="pending">{t.filters.pending}</option>
              <option value="reviewing">{t.filters.reviewing}</option>
              <option value="resolved">{t.filters.resolved}</option>
              <option value="rejected">{t.filters.rejected}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
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
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.request}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.message}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.submitted}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <svg
                      className="w-12 h-12 mx-auto text-gray-300 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p>{t.noRequests}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {request.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">
                            {request.name}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden line-clamp-1">
                            {request.message}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {request.message}
                      </p>
                      {request.image && (
                        <div className="flex items-center gap-1 mt-1">
                          <svg
                            className="w-3 h-3 text-gray-400"
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
                          <span className="text-xs text-gray-400">
                            {request.image.name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              request.status,
                            )}`}
                          >
                            {getStatusLabel(request.status)}
                          </span>
                          <select
                            value={request.status}
                            onChange={(e) =>
                              handleStatusChange(
                                request,
                                e.target.value as Request["status"],
                              )
                            }
                            className="px-2 py-1 text-xs border rounded-lg focus:ring-2 focus:ring-[#FF385C] outline-none"
                          >
                            <option value="pending">
                              {t.statuses.pending}
                            </option>
                            <option value="reviewing">
                              {t.statuses.reviewing}
                            </option>
                            <option value="resolved">
                              {t.statuses.resolved}
                            </option>
                            <option value="rejected">
                              {t.statuses.rejected}
                            </option>
                          </select>
                        </div>
                      ) : (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            request.status,
                          )}`}
                        >
                          {getStatusLabel(request.status)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">
                        {formatDate(request.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(request)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewRequest}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </motion.button>
                        {canEditRequest(request) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEditModal(request)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.editRequest}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </motion.button>
                        )}
                        {canDeleteRequest(request) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openDeleteModal(request)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t.deleteRequest}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>
                        )}
                        {!canEditRequest(request) &&
                          !canDeleteRequest(request) &&
                          !isAdmin && (
                            <span className="text-xs text-gray-400">
                              View only
                            </span>
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
            {t.showing} {filteredRequests.length} {t.of} {requests.length}{" "}
            {t.requests}
          </p>
        </div>
      </div>

      {/* Create Request Modal */}
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
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t.createRequest}
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetForm();
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
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

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourName}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.yourName}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourEmail}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.yourEmail}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourMessage}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={t.yourMessage}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.attachImage}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                      >
                        Choose File
                      </label>
                      {formData.imagePreview && (
                        <div className="relative">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                image: null,
                                imagePreview: "",
                              })
                            }
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <svg
                              className="w-3 h-3"
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
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {t.imageRequirements}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateRequest}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        t.send
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Request Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedRequest && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedRequest(null);
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
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t.editRequest}
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedRequest(null);
                      resetForm();
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
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

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourName}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.yourName}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourEmail}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.yourEmail}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.yourMessage}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={t.yourMessage}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.attachImage}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="image-upload-edit"
                      />
                      <label
                        htmlFor="image-upload-edit"
                        className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                      >
                        {formData.imagePreview ? "Change Image" : "Choose File"}
                      </label>
                      {formData.imagePreview && (
                        <div className="relative">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                image: null,
                                imagePreview: "",
                              })
                            }
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <svg
                              className="w-3 h-3"
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
                      {!formData.imagePreview && selectedRequest.image && (
                        <div className="relative">
                          <img
                            src={selectedRequest.image.dataUrl}
                            alt="Current"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded">
                            current
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {t.imageRequirements}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedRequest(null);
                        resetForm();
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateRequest}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        t.updateRequest
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View Request Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedRequest && (
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
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t.requestDetails}
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
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

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.requesterName}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedRequest.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.requesterEmail}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedRequest.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.status}
                    </label>
                    <div className="mt-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedRequest.status,
                        )}`}
                      >
                        {getStatusLabel(selectedRequest.status)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.requestMessage}
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedRequest.message}
                      </p>
                    </div>
                  </div>

                  {selectedRequest.image && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.attachedImage}
                      </label>
                      <div className="mt-2">
                        <button
                          onClick={() => setIsImageModalOpen(true)}
                          className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={selectedRequest.image.dataUrl}
                            alt={selectedRequest.image.name}
                            className="max-h-48 object-contain cursor-pointer"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {selectedRequest.image.name}
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedRequest.response && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.responseLabel}
                      </label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedRequest.response}
                        </p>
                        {selectedRequest.respondedBy && (
                          <p className="text-xs text-gray-500 mt-2">
                            Responded by: {selectedRequest.respondedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.submitted}
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        Updated
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatDate(selectedRequest.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedRequest && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedRequest(null);
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
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.deleteRequest}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.deleteConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      {t.actionUndone}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteRequest}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedRequest?.image && (
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
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
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
                  src={selectedRequest.image.dataUrl}
                  alt={selectedRequest.image.name}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
                  {selectedRequest.image.name} (
                  {(selectedRequest.image.size / 1024).toFixed(1)} KB)
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
