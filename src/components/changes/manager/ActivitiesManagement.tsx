/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect, useCallback, type JSX } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  BookOnline as BookOnlineIcon,
  ContactMail as ContactMailIcon,
  Message as MessageIcon,
  RateReview as RateReviewIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Clear as ClearIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    title: "Activity Logs",
    totalActivities: "Total Activities",
    uniqueUsers: "Unique Users",
    mostActiveAction: "Most Active Action",
    searchPlaceholder: "Search logs by user, action, IP, description...",
    allActions: "All Actions",
    allTime: "All Time",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    clear: "Clear",
    noLogsFound: "No logs found matching the current filters",
    rowsPerPage: "Rows per page",
    previous: "Previous",
    next: "Next",
    activityDetails: "Activity Details",
    userInformation: "User Information",
    role: "Role",
    phone: "Phone",
    userID: "User ID",
    action: "Action",
    entityType: "Entity Type",
    description: "Description",
    ipAddress: "IP Address",
    userAgent: "User Agent",
    createdAt: "Created At",
    timeHappened: "Time Happened",
    updatedAt: "Updated At",
    close: "Close",
    viewDetails: "View Details",
    loading: "Loading...",
    error: "An error occurred",
    fetchError: "Failed to fetch activities",
    managerAccess: "Manager Access",
    managerViewOnly: "You have view access to all activity logs",
    userLogin: "User Login",
    userCreated: "User Created",
    userUpdated: "User Updated",
    userDeleted: "User Deleted",
    houseCreated: "House Created",
    houseUpdated: "House Updated",
    houseDeleted: "House Deleted",
    bookingCreated: "Booking Created",
    bookingUpdated: "Booking Updated",
    bookingDeleted: "Booking Deleted",
    contactCreated: "Contact Created",
    messageCreated: "Message Created",
    testimonialCreated: "Testimonial Created",
    refresh: "Refresh",
    export: "Export",
    translating: "Translating...",
    monitorActivities: "Monitor user activities and system events",
    view: "View",
  },
  fr: {
    title: "Journaux d'Activité",
    totalActivities: "Total des Activités",
    uniqueUsers: "Utilisateurs Uniques",
    mostActiveAction: "Action la Plus Active",
    searchPlaceholder: "Rechercher par utilisateur, action, IP, description...",
    allActions: "Toutes les Actions",
    allTime: "Toute la Période",
    today: "Aujourd'hui",
    thisWeek: "Cette Semaine",
    thisMonth: "Ce Mois",
    clear: "Effacer",
    noLogsFound: "Aucun journal trouvé correspondant aux filtres",
    rowsPerPage: "Lignes par page",
    previous: "Précédent",
    next: "Suivant",
    activityDetails: "Détails de l'Activité",
    userInformation: "Informations Utilisateur",
    role: "Rôle",
    phone: "Téléphone",
    userID: "ID Utilisateur",
    action: "Action",
    entityType: "Type d'Entité",
    description: "Description",
    ipAddress: "Adresse IP",
    userAgent: "Agent Utilisateur",
    createdAt: "Créé le",
    timeHappened: "Heure de l'Événement",
    updatedAt: "Mis à Jour le",
    close: "Fermer",
    viewDetails: "Voir les Détails",
    loading: "Chargement...",
    error: "Une erreur est survenue",
    fetchError: "Échec du chargement des activités",
    managerAccess: "Accès Manager",
    managerViewOnly: "Vous avez un accès en visualisation à tous les journaux d'activité",
    userLogin: "Connexion Utilisateur",
    userCreated: "Utilisateur Créé",
    userUpdated: "Utilisateur Mis à Jour",
    userDeleted: "Utilisateur Supprimé",
    houseCreated: "Maison Créée",
    houseUpdated: "Maison Mise à Jour",
    houseDeleted: "Maison Supprimée",
    bookingCreated: "Réservation Créée",
    bookingUpdated: "Réservation Mise à Jour",
    bookingDeleted: "Réservation Supprimée",
    contactCreated: "Contact Créé",
    messageCreated: "Message Créé",
    testimonialCreated: "Témoignage Créé",
    refresh: "Actualiser",
    export: "Exporter",
    translating: "Traduction en cours...",
    monitorActivities: "Surveiller les activités des utilisateurs et les événements système",
    view: "Voir",
  },
  rw: {
    title: "Akarongo k'ibikorwa",
    totalActivities: "Ibikorwa byose",
    uniqueUsers: "Abakoresha batandukanye",
    mostActiveAction: "Igikorwa gikoreshwa cyane",
    searchPlaceholder: "Shakisha ukurikije umukoresha, igikorwa, IP, ibisobanuro...",
    allActions: "Ibikorwa Byose",
    allTime: "Igihe Cyose",
    today: "Uyu Munsi",
    thisWeek: "Iyi Nyi",
    thisMonth: "Uku Kwezi",
    clear: "Kuraho",
    noLogsFound: "Nta karongo kabonetse",
    rowsPerPage: "Imirongo ku rupapuro",
    previous: "Ibibanziriza",
    next: "Ibikurikira",
    activityDetails: "Ibisobanuro by'Igikorwa",
    userInformation: "Amakuru y'Umukoresha",
    role: "Uruhushya",
    phone: "Telefoni",
    userID: "ID y'Umukoresha",
    action: "Igikorwa",
    entityType: "Ubwoko",
    description: "Ibisobanuro",
    ipAddress: "Adresi ya IP",
    userAgent: "Umukoresha",
    createdAt: "Byakozwe",
    timeHappened: "Igihe cyabaye",
    updatedAt: "Byavuguruwe",
    close: "Funga",
    viewDetails: "Reba Ibisobanuro",
    loading: "Birakoreshwa...",
    error: "Hari ikibazo",
    fetchError: "Kubura ibikorwa birananiranye",
    managerAccess: "Uburenganzira bwa Manager",
    managerViewOnly: "Ufite uburenganzira bwo kureba akarongo kose",
    userLogin: "Kwinjira kw'Umukoresha",
    userCreated: "Umukoresha Yaremanywe",
    userUpdated: "Umukoresha Yavuguruwe",
    userDeleted: "Umukoresha Yakuvyeho",
    houseCreated: "Inzu Yaremanywe",
    houseUpdated: "Inzu Yavuguruwe",
    houseDeleted: "Inzu Yakuvyeho",
    bookingCreated: "Icyemezo Cyaremanywe",
    bookingUpdated: "Icyemezo Cyavuguruwe",
    bookingDeleted: "Icyemezo Cyakuvyeho",
    contactCreated: "Amakuru Yaremanywe",
    messageCreated: "Ubutumwa Bwaremanywe",
    testimonialCreated: "Icyatangazo Cyaremanywe",
    refresh: "Vugurura",
    export: "Kuvana",
    translating: "Birahindurwa...",
    monitorActivities: "Kurikirana ibikorwa by'abakoresha n'ibyabaye muri sisitemu",
    view: "Reba",
  },
};

// ============================================
// GOOGLE TRANSLATE API FOR ACTIVITY LOGS
// ============================================
const GOOGLE_TRANSLATE_API_URL =
  "https://translate.googleapis.com/translate_a/single";

const translateText = async (
  text: string,
  targetLang: string,
): Promise<string> => {
  if (!text || text.trim() === "") return text;
  if (targetLang === "en") return text;

  try {
    const response = await axios.get(GOOGLE_TRANSLATE_API_URL, {
      params: {
        client: "gtx",
        sl: "auto",
        tl: targetLang,
        dt: "t",
        q: text,
      },
    });

    if (response.data && Array.isArray(response.data) && response.data[0]) {
      let translated = "";
      for (const part of response.data[0]) {
        if (part && part[0]) {
          translated += part[0];
        }
      }
      return translated || text;
    }
    return text;
  } catch (_error) {
    // Silently return original text on translation failure
    return text;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Types
interface ActivityLog {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      };
  userName: string;
  userEmail: string;
  action: string;
  description: string;
  ipAddress: string;
  ipv4Address?: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  timeHappened: string;
  __v?: number;
}

interface FilterOptions {
  action: string;
  dateRange: "today" | "week" | "month" | "all";
  searchTerm: string;
}

interface Stats {
  totalActivities: number;
  uniqueUsers: number;
  actionsByType: { [key: string]: number };
}

// Helper function to safely format dates
const formatDateSafe = (
  timestamp: string | undefined | null,
  formatStr: string,
): string => {
  if (!timestamp) return "N/A";
  try {
    return format(parseISO(timestamp), formatStr);
  } catch {
    return "Invalid Date";
  }
};

const formatDistanceSafe = (timestamp: string | undefined | null): string => {
  if (!timestamp) return "N/A";
  try {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  } catch {
    return "Invalid Date";
  }
};

// Type guard to check if userId is an object
const isUserIdObject = (
  userId:
    | string
    | { _id: string; name: string; email: string; phone: string; role: string },
): userId is {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
} => {
  return typeof userId === "object" && userId !== null && "_id" in userId;
};

// Helper functions to safely access user data
const getUserId = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId)) return log.userId._id;
  return log.userId as string;
};

const getUserName = (log: ActivityLog): string => {
  if (log.userName) return log.userName;
  if (isUserIdObject(log.userId) && log.userId.name) return log.userId.name;
  return "Unknown User";
};

const getUserEmail = (log: ActivityLog): string => {
  if (log.userEmail) return log.userEmail;
  if (isUserIdObject(log.userId) && log.userId.email) return log.userId.email;
  return "";
};

const getUserRole = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId) && log.userId.role) return log.userId.role;
  return "";
};

const getUserPhone = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId) && log.userId.phone) return log.userId.phone;
  return "";
};

// Create axios instance with interceptors
const api = axios.create({
  baseURL: "https://rene-inyumba-nodejs.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const ActivitiesManagement: React.FC = () => {
  // Language
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const t = translations[lang];

  // State
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    action: "all",
    dateRange: "all",
    searchTerm: "",
  });
  const [stats, setStats] = useState<Stats>({
    totalActivities: 0,
    uniqueUsers: 0,
    actionsByType: {},
  });

  // Listen for language changes
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

  // Translate action names and descriptions
  const translateLogs = useCallback(
    async (logsData: ActivityLog[]) => {
      if (lang === "en") return logsData;

      setTranslating(true);
      try {
        const translatedLogs = await Promise.all(
          logsData.map(async (log) => {
            const translatedDescription = await translateText(
              log.description,
              lang,
            );
            const translatedAction = await translateText(log.action, lang);
            return {
              ...log,
              description: translatedDescription,
              action: translatedAction,
            };
          }),
        );
        return translatedLogs;
      } catch (_error) {
        // Silently return original logs on translation failure
        return logsData;
      } finally {
        setTranslating(false);
      }
    },
    [lang],
  );

  // Apply translations when language changes
  useEffect(() => {
    const applyTranslations = async () => {
      if (logs.length > 0) {
        const translated = await translateLogs(logs);
        setLogs(translated);
        calculateStats(translated);
        applyFilters(translated, filters);
      }
    };
    applyTranslations();
  }, [lang, logs, filters, translateLogs]);

  // Calculate statistics
  const calculateStats = (logsData: ActivityLog[]) => {
    const uniqueUsers = new Set(
      logsData.map((log) => getUserEmail(log) || getUserId(log)),
    ).size;

    const actionsByType: { [key: string]: number } = {};

    logsData.forEach((log) => {
      actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
    });

    setStats({
      totalActivities: logsData.length,
      uniqueUsers,
      actionsByType,
    });
  };

  // Apply filters
  const applyFilters = (
    logsData: ActivityLog[],
    currentFilters: FilterOptions,
  ) => {
    let filtered = [...logsData];

    if (currentFilters.action !== "all") {
      filtered = filtered.filter((log) => log.action === currentFilters.action);
    }

    const now = new Date();
    if (currentFilters.dateRange === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= today;
        } catch {
          return false;
        }
      });
    } else if (currentFilters.dateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= weekAgo;
        } catch {
          return false;
        }
      });
    } else if (currentFilters.dateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= monthAgo;
        } catch {
          return false;
        }
      });
    }

    if (currentFilters.searchTerm.trim()) {
      const search = currentFilters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((log) => {
        return (
          getUserEmail(log).toLowerCase().includes(search) ||
          getUserName(log).toLowerCase().includes(search) ||
          log.action.toLowerCase().includes(search) ||
          log.description?.toLowerCase().includes(search) ||
          log.ipAddress?.includes(search)
        );
      });
    }

    setFilteredLogs(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(logs, newFilters);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("searchTerm", event.target.value);
  };

  // Clear filters
  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      action: "all",
      dateRange: "all",
      searchTerm: "",
    };
    setFilters(defaultFilters);
    applyFilters(logs, defaultFilters);
  };

  // Fetch logs using axios
  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/auth/activities");

      let activities: ActivityLog[] = [];

      if (response.data.activities && Array.isArray(response.data.activities)) {
        activities = response.data.activities;
      } else if (Array.isArray(response.data)) {
        activities = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        activities = response.data.data;
      }

      setLogs(activities);
      calculateStats(activities);
      applyFilters(activities, filters);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An error occurred while fetching logs";
      setError(errorMessage);
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Handle pagination
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // View log details
  const handleViewDetails = (log: ActivityLog) => {
    setSelectedLog(log);
    setDetailDialogOpen(true);
  };

  // Export logs as PDF
  const exportLogsPDF = () => {
    if (filteredLogs.length === 0) return;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFillColor(52, 58, 64);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F");

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("Activity Logs Report", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Generated: ${format(new Date(), "PPpp")}`, 14, 32);
    doc.text(`Total Records: ${filteredLogs.length}`, doc.internal.pageSize.getWidth() - 14, 32, { align: "right" });

    const tableData = filteredLogs.map((log) => [
      formatDateSafe(log.createdAt, "MMM d, yyyy HH:mm"),
      getUserName(log),
      getUserEmail(log),
      log.action.replace("_", " "),
      log.description?.substring(0, 50) + (log.description?.length > 50 ? "..." : ""),
      log.ipAddress || log.ipv4Address || "N/A",
    ]);

    autoTable(doc, {
      head: [["Time", "User", "Email", "Action", "Description", "IP Address"]],
      body: tableData,
      startY: 48,
      styles: {
        fontSize: 7,
        cellPadding: 3,
        valign: "middle",
      },
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        0: { cellWidth: 35, halign: "center" },
        1: { cellWidth: 30 },
        2: { cellWidth: 35 },
        3: { cellWidth: 25, halign: "center" },
        4: { cellWidth: 55 },
        5: { cellWidth: 30, halign: "center" },
      },
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(108, 117, 125);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount} - © ${new Date().getFullYear()} Activity Logs`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" },
        );
      },
    });

    doc.save(`activity-logs-${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  // Get action icon
  const getActionIcon = (action: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      user_login: (
        <LoginIcon className="text-blue-600" style={{ fontSize: "20px" }} />
      ),
      user_created: (
        <PersonAddIcon
          className="text-green-600"
          style={{ fontSize: "20px" }}
        />
      ),
      user_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      user_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      house_created: (
        <HomeIcon className="text-green-600" style={{ fontSize: "20px" }} />
      ),
      house_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      house_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      booking_created: (
        <BookOnlineIcon
          className="text-blue-600"
          style={{ fontSize: "20px" }}
        />
      ),
      booking_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      booking_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      contact_created: (
        <ContactMailIcon
          className="text-purple-600"
          style={{ fontSize: "20px" }}
        />
      ),
      message_created: (
        <MessageIcon className="text-blue-600" style={{ fontSize: "20px" }} />
      ),
      testimonial_created: (
        <RateReviewIcon
          className="text-green-600"
          style={{ fontSize: "20px" }}
        />
      ),
    };
    return (
      iconMap[action] || (
        <InfoIcon className="text-gray-600" style={{ fontSize: "20px" }} />
      )
    );
  };

  // Get entity type icon
  const getEntityIcon = (action: string) => {
    if (action.includes("user"))
      return (
        <PersonIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("house"))
      return (
        <HomeIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("booking"))
      return (
        <BookOnlineIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    if (action.includes("contact"))
      return (
        <ContactMailIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    if (action.includes("message"))
      return (
        <MessageIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("testimonial"))
      return (
        <RateReviewIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    return <InfoIcon className="text-gray-600" style={{ fontSize: "18px" }} />;
  };

  // Get entity type from action
  const getEntityType = (action: string): string => {
    if (action.includes("user")) return "User";
    if (action.includes("house")) return "House";
    if (action.includes("booking")) return "Booking";
    if (action.includes("contact")) return "Contact";
    if (action.includes("message")) return "Message";
    if (action.includes("testimonial")) return "Testimonial";
    return action;
  };

  // Get action badge style
  const getActionBadgeStyle = (action: string): string => {
    const styleMap: { [key: string]: string } = {
      user_login: "bg-blue-50 text-blue-700 border-blue-200",
      user_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
      user_updated: "bg-amber-50 text-amber-700 border-amber-200",
      user_deleted: "bg-red-50 text-red-700 border-red-200",
      house_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
      house_updated: "bg-amber-50 text-amber-700 border-amber-200",
      house_deleted: "bg-red-50 text-red-700 border-red-200",
      booking_created: "bg-blue-50 text-blue-700 border-blue-200",
      booking_updated: "bg-amber-50 text-amber-700 border-amber-200",
      booking_deleted: "bg-red-50 text-red-700 border-red-200",
      contact_created: "bg-purple-50 text-purple-700 border-purple-200",
      message_created: "bg-indigo-50 text-indigo-700 border-indigo-200",
      testimonial_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return styleMap[action] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  // Get action color for dialog - REMOVED as it's not used
  // const getActionColor = (action: string): string => { ... }

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Loading state with professional skeleton
  if (loading || translating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="h-10 w-56 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="flex gap-3">
                  <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                  <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-5 bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-2xl border border-slate-200/50"
                  >
                    <div className="h-4 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-3"></div>
                    <div className="h-10 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-12 flex-1 min-w-[200px] bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-slate-100"
                  >
                    <div className="h-12 w-36 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 flex-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique action types for filters
  const actionTypes = Array.from(new Set(logs.map((log) => log.action)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 lg:p-8 mt-4">
      <div className="max-w-7xl mx-auto">
        {/* Manager Access Notice */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <DashboardIcon className="text-blue-600 w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-blue-700 font-semibold">
              {t.managerAccess}
            </p>
            <p className="text-xs text-blue-600">{t.managerViewOnly}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-blue-200">
            <LanguageIcon className="text-blue-600 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 uppercase">
              {lang}
            </span>
          </div>
        </div>

        {/* Modern Header with Glass Effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 mb-8 hover:shadow-3xl transition-all duration-500 mt-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25">
                <DashboardIcon className="text-white" style={{ fontSize: "28px" }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.monitorActivities}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchLogs}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-sm font-medium"
              >
                <RefreshIcon className="text-slate-500 group-hover:rotate-180 transition-transform duration-500" style={{ fontSize: "18px" }} />
                {t.refresh}
              </button>
              <button
                onClick={exportLogsPDF}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:via-rose-700 hover:to-pink-700 hover:shadow-xl shadow-rose-500/25 transition-all duration-300 text-sm font-medium"
              >
                <DownloadIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "18px" }} />
                {t.export}
              </button>
            </div>
          </div>

          {/* Premium Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-700/80 flex items-center gap-2">
                    <EventNoteIcon style={{ fontSize: "16px" }} />
                    {t.totalActivities}
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mt-2">
                    {stats.totalActivities.toLocaleString()}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <EventNoteIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-200/60 px-3 py-1 rounded-full">
                  Last 30 days
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-emerald-700/80 flex items-center gap-2">
                    <PeopleIcon style={{ fontSize: "16px" }} />
                    {t.uniqueUsers}
                  </div>
                  <div className="text-3xl font-bold text-emerald-900 mt-2">
                    {stats.uniqueUsers.toLocaleString()}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <PeopleIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-200/60 px-3 py-1 rounded-full">
                  Active users
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-2xl border border-purple-200/50 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-purple-700/80 flex items-center gap-2">
                    <TrendingUpIcon style={{ fontSize: "16px" }} />
                    {t.mostActiveAction}
                  </div>
                  <div className="text-lg font-bold text-purple-900 mt-2 truncate max-w-[140px]">
                    {Object.entries(stats.actionsByType)
                      .sort((a, b) => b[1] - a[1])[0]?.[0]
                      ?.replace("_", " ") || "N/A"}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUpIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-200/60 px-3 py-1 rounded-full">
                  {Object.entries(stats.actionsByType).sort(
                    (a, b) => b[1] - a[1],
                  )[0]?.[1] || 0}{" "}
                  occurrences
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-2xl border border-amber-200/50 hover:shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-amber-700/80 flex items-center gap-2">
                    <FilterListIcon style={{ fontSize: "16px" }} />
                    Action Types
                  </div>
                  <div className="text-3xl font-bold text-amber-900 mt-2">
                    {Object.keys(stats.actionsByType).length}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <FilterListIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-amber-600 bg-amber-200/60 px-3 py-1 rounded-full">
                  Different types
                </span>
              </div>
            </div>
          </div>

          {/* Premium Filters with Glass Effect */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center p-4 bg-gradient-to-br from-slate-50/80 to-white/80 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
            <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={filters.searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-12 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm placeholder:text-slate-400"
              />
              <SearchIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                style={{ fontSize: "20px" }}
              />
            </div>

            <select
              value={filters.action}
              onChange={(e) => handleFilterChange("action", e.target.value)}
              className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
            >
              <option value="all">{t.allActions}</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action.replace("_", " ")}
                </option>
              ))}
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
            >
              <option value="all">{t.allTime}</option>
              <option value="today">{t.today}</option>
              <option value="week">{t.thisWeek}</option>
              <option value="month">{t.thisMonth}</option>
            </select>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/80 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm text-slate-700 font-medium hover:shadow-lg"
            >
              <ClearIcon style={{ fontSize: "18px" }} />
              {t.clear}
            </button>
          </div>
        </div>

        {/* Error message with glass effect */}
        {error && (
          <div className="p-5 px-7 bg-gradient-to-br from-red-50/90 to-red-100/50 backdrop-blur-sm text-red-700 rounded-2xl mb-6 border border-red-200 flex items-center gap-4 shadow-lg shadow-red-500/10 mt-4">
            <div className="p-2 bg-red-200/50 rounded-xl">
              <ErrorIcon className="text-red-500" style={{ fontSize: "24px" }} />
            </div>
            <span className="flex-1 font-medium">{error}</span>
            <button
              onClick={() => setError(null)}
              className="p-2 hover:bg-red-200/50 rounded-xl transition-colors duration-200 text-red-500 hover:text-red-700"
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
          </div>
        )}

        {/* Premium Table with Glass Effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500 mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-br from-slate-50/80 to-slate-100/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <ScheduleIcon style={{ fontSize: "14px" }} />
                      Time
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <PersonIcon style={{ fontSize: "14px" }} />
                      User
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <SettingsIcon style={{ fontSize: "14px" }} />
                      Action
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <PublicIcon style={{ fontSize: "14px" }} />
                      IP Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-slate-100 rounded-full">
                          <InfoIcon
                            className="text-slate-300"
                            style={{ fontSize: "56px" }}
                          />
                        </div>
                        <p className="text-slate-500 font-semibold text-lg">
                          {t.noLogsFound}
                        </p>
                        <p className="text-sm text-slate-400">
                          Try adjusting your filters or search terms
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <tr
                        key={log._id}
                        className={`hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-300 group ${
                          index % 2 === 0 ? "bg-white/50" : "bg-slate-50/30"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">
                              {formatDistanceSafe(log.createdAt)}
                            </span>
                            <span className="text-xs text-slate-400 mt-0.5">
                              {formatDateSafe(
                                log.createdAt,
                                "MMM d, yyyy HH:mm",
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
                                {getUserName(log).charAt(0).toUpperCase()}
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-800">
                                {getUserName(log)}
                              </span>
                              <span className="text-xs text-slate-500">
                                {getUserEmail(log)}
                              </span>
                              {getUserRole(log) && (
                                <span className="text-xs font-medium text-slate-400 capitalize">
                                  {getUserRole(log)}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getActionBadgeStyle(log.action)} shadow-sm`}
                          >
                            {getActionIcon(log.action)}
                            {log.action.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5 max-w-[240px]">
                            <span className="text-sm text-slate-700 truncate">
                              {log.description}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              {getEntityIcon(log.action)}
                              {getEntityType(log.action)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs font-mono bg-slate-100/80 px-3 py-1.5 rounded-xl text-slate-600 border border-slate-200/50">
                            {log.ipAddress || log.ipv4Address || "N/A"}
                          </code>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleViewDetails(log)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg shadow-blue-500/25 transition-all duration-300 text-sm font-medium group"
                          >
                            <VisibilityIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "16px" }} />
                            {t.view}
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination */}
          {filteredLogs.length > 0 && (
            <div className="px-6 py-4 flex flex-wrap justify-between items-center border-t border-slate-100 gap-3 bg-gradient-to-br from-slate-50/30 to-transparent backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 font-medium">{t.rowsPerPage}:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  className="px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:border-slate-300 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="text-sm text-slate-600 font-medium">
                <span className="text-slate-800">{filteredLogs.length}</span> total
                logs
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-800">
                  {page * rowsPerPage + 1}
                </span> -{" "}
                <span className="text-slate-800">
                  {Math.min((page + 1) * rowsPerPage, filteredLogs.length)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
                    page === 0
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  {t.previous}
                </button>
                <button
                  onClick={() => handleChangePage(page + 1)}
                  disabled={
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                  }
                  className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600">{filteredLogs.length}</span> of{" "}
            <span className="text-slate-600">{logs.length}</span> total activities
          </p>
        </div>
      </div>

      {/* Premium Detail Dialog */}
      {detailDialogOpen && selectedLog && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setDetailDialogOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl shadow-black/25 animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-8 py-5 border-b border-slate-100 flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/25">
                    <InfoIcon style={{ fontSize: "22px" }} />
                  </span>
                  {t.activityDetails}
                </h2>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getActionBadgeStyle(selectedLog.action)}`}
                >
                  {getActionIcon(selectedLog.action)}
                  {selectedLog.action.replace("_", " ")}
                </span>
              </div>
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-2xl transition-colors duration-200 text-slate-400 hover:text-slate-600"
              >
                <CloseIcon style={{ fontSize: "24px" }} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* User Information */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200/50 mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg">
                    <PersonIcon className="text-blue-600" style={{ fontSize: "18px" }} />
                  </div>
                  {t.userInformation}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Name</span>
                    <span className="text-sm font-semibold text-slate-900 mt-1">
                      {getUserName(selectedLog)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Email</span>
                    <span className="text-sm text-slate-700 mt-1">
                      {getUserEmail(selectedLog)}
                    </span>
                  </div>
                  {getUserRole(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">{t.role}</span>
                      <span className="text-sm capitalize font-semibold text-slate-800 mt-1">
                        {getUserRole(selectedLog)}
                      </span>
                    </div>
                  )}
                  {getUserPhone(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">{t.phone}</span>
                      <span className="text-sm text-slate-700 mt-1">
                        {getUserPhone(selectedLog)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col col-span-full">
                    <span className="text-xs text-slate-500 font-medium">{t.userID}</span>
                    <code className="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 truncate mt-1">
                      {getUserId(selectedLog)}
                    </code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.entityType}</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="p-1.5 bg-slate-100 rounded-lg">
                      {getEntityIcon(selectedLog.action)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {getEntityType(selectedLog.action)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.action}</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1.5">
                    {selectedLog.action.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <span className="text-xs text-slate-500 font-medium">{t.description}</span>
                <div className="mt-1.5 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedLog.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.ipAddress}</span>
                  <code className="text-sm font-mono bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-600 mt-1.5">
                    {selectedLog.ipAddress || selectedLog.ipv4Address || "N/A"}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.userAgent}</span>
                  <span className="text-xs text-slate-600 mt-1.5 break-all line-clamp-2 bg-white p-3 rounded-xl border border-slate-200">
                    {selectedLog.userAgent || "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.createdAt}</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">
                    {formatDateSafe(selectedLog.createdAt, "PPpp")}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {formatDistanceSafe(selectedLog.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">{t.timeHappened}</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">
                    {selectedLog.timeHappened || "N/A"}
                  </span>
                </div>
              </div>

              {selectedLog.updatedAt &&
                selectedLog.updatedAt !== selectedLog.createdAt && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">{t.updatedAt}</span>
                    <span className="text-sm font-semibold text-slate-800 block mt-1">
                      {formatDateSafe(selectedLog.updatedAt, "PPpp")}
                    </span>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl shadow-blue-500/25 transition-all duration-300 text-sm font-semibold"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};