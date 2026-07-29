/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "host";
  avatar?: string;
  joinedDate?: string;
}

// Translations
const translations = {
  en: {
    accountSettings: "Account Settings",
    manageProfile: "Manage your profile information and security settings",
    profileInformation: "Profile Information",
    securitySettings: "Security Settings", 
    editName: "Edit Name",
    changePassword: "Change Password",
    fullName: "Full Name",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    saveChanges: "Save Changes",
    updatePassword: "Update Password",
    cancel: "Cancel",
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    currentPasswordRequired: "Current password is required",
    newPasswordRequired: "New password is required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    nameUpdated: "Name updated successfully!",
    nameUpdateFailed: "Failed to update name",
    passwordUpdated: "Password updated successfully!",
    passwordUpdateFailed: "Failed to update password",
    loading: "Loading...",
    secure: "Secure",
    role: "Role",
    memberSince: "Member since",
    user: "User",
    admin: "Admin",
    host: "Host",
    profile: "Profile",
    response: "Response",
  },
  fr: {
    accountSettings: "Paramètres du Compte",
    manageProfile:
      "Gérez vos informations de profil et vos paramètres de sécurité",
    profileInformation: "Informations du Profil",
    securitySettings: "Paramètres de Sécurité",
    editName: "Modifier le Nom",
    changePassword: "Changer le Mot de Passe",
    fullName: "Nom Complet",
    currentPassword: "Mot de Passe Actuel",
    newPassword: "Nouveau Mot de Passe",
    confirmPassword: "Confirmer le Nouveau Mot de Passe",
    saveChanges: "Enregistrer les Modifications",
    updatePassword: "Mettre à Jour le Mot de Passe",
    cancel: "Annuler",
    nameRequired: "Le nom est requis",
    nameMinLength: "Le nom doit contenir au moins 2 caractères",
    currentPasswordRequired: "Le mot de passe actuel est requis",
    newPasswordRequired: "Le nouveau mot de passe est requis",
    passwordMinLength: "Le mot de passe doit contenir au moins 6 caractères",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    nameUpdated: "Nom mis à jour avec succès !",
    nameUpdateFailed: "Échec de la mise à jour du nom",
    passwordUpdated: "Mot de passe mis à jour avec succès !",
    passwordUpdateFailed: "Échec de la mise à jour du mot de passe",
    loading: "Chargement...",
    secure: "Sécurisé",
    role: "Rôle",
    memberSince: "Membre depuis",
    user: "Utilisateur",
    admin: "Administrateur",
    host: "Hôte",
    profile: "Profil",
    response: "Réponse",
  },
  rw: {
    accountSettings: "Igenamiterere ya Konti",
    manageProfile: "Gucunga amakuru yawe n'iby'umutekano",
    profileInformation: "Amakuru ya Profil",
    securitySettings: "Igenamiterere y'Umutekano",
    editName: "Hindura Izina",
    changePassword: "Hindura Ijambobanga",
    fullName: "Izina Ryose",
    currentPassword: "Ijambobanga Ry'ubu",
    newPassword: "Ijambobanga Rishya",
    confirmPassword: "Emeza Ijambobanga Rishya",
    saveChanges: "Bika Impinduka",
    updatePassword: "Vugurura Ijambobanga",
    cancel: "Reka",
    nameRequired: "Izina rirasabwa",
    nameMinLength: "Izina rigomba kugira byibura inyuguti 2",
    currentPasswordRequired: "Ijambobanga ry'ubu rirasabwa",
    newPasswordRequired: "Ijambobanga rishya rirasabwa",
    passwordMinLength: "Ijambobanga rigomba kugira byibura inyuguti 6",
    passwordMismatch: "Ijambobanga ntirihuje",
    nameUpdated: "Izina rivuguruwe neza!",
    nameUpdateFailed: "Kuvugurura izina birananiranye",
    passwordUpdated: "Ijambobanga rivuguruwe neza!",
    passwordUpdateFailed: "Kuvugurura ijambobanga birananiranye",
    loading: "Biratwara...",
    secure: "Mubutekano",
    role: "Uruhanya",
    memberSince: "Yinjiye kuva",
    user: "Umukoresha",
    admin: "Muyobozi",
    host: "Umutambyi",
    profile: "Profil",
    response: "Igisubizo",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Mock API functions (replace with actual API calls)
const mockGetUserByEmail = async (email: string): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: 1,
    name: "John Doe",
    email: email || "john@example.com",
    role: "user",
    joinedDate: "2024-01-15",
  };
};

const mockUpdateUser = async (
  email: string,
  data: { name?: string; password?: string },
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Updating user:", email, data);
  return {
    success: true,
    message: "Profile updated successfully!",
  };
};

export const MeManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState({
    name: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Get user email from cookies
  const userEmail = Cookies.get("userEmail") || "";
  const t = translations[lang];

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    // Check for cookie changes every second (polling)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const email = userEmail || "john@example.com";
      const data = await mockGetUserByEmail(email);
      setUserData(data);
      setFormData((prev) => ({ ...prev, name: data.name }));
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error(`❌ ${t.nameUpdateFailed}`);
    } finally {
      setLoading(false);
    }
  }, [userEmail, t]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateName = (): boolean => {
    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: t.nameRequired }));
      return false;
    }
    if (formData.name.trim().length < 2) {
      setErrors((prev) => ({ ...prev, name: t.nameMinLength }));
      return false;
    }
    return true;
  };

  const validatePassword = (): boolean => {
    if (!formData.currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: t.currentPasswordRequired,
      }));
      return false;
    }
    if (!formData.newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: t.newPasswordRequired }));
      return false;
    }
    if (formData.newPassword.length < 6) {
      setErrors((prev) => ({ ...prev, newPassword: t.passwordMinLength }));
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: t.passwordMismatch }));
      return false;
    }
    return true;
  };

  const handleUpdateName = async () => {
    if (!validateName()) return;

    try {
      setSaving(true);
      const email = userEmail || "john@example.com";
      await mockUpdateUser(email, { name: formData.name });

      setUserData((prev) => (prev ? { ...prev, name: formData.name } : null));
      setEditMode((prev) => ({ ...prev, name: false }));
      toast.success(`✅ ${t.nameUpdated}`);
    } catch (err) {
      console.error("Error updating name:", err);
      toast.error(`❌ ${t.nameUpdateFailed}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!validatePassword()) return;

    try {
      setSaving(true);
      const email = userEmail || "john@example.com";
      await mockUpdateUser(email, { password: formData.newPassword });

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setEditMode((prev) => ({ ...prev, password: false }));
      toast.success(`✅ ${t.passwordUpdated}`);
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error(`❌ ${t.passwordUpdateFailed}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = (field: "name" | "password") => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    if (field === "name") {
      setFormData((prev) => ({ ...prev, name: userData?.name || "" }));
      setErrors((prev) => ({ ...prev, name: undefined }));
    } else {
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setErrors((prev) => ({
        ...prev,
        currentPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header Section */}
      <div className="mb-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full"></div>
        <div className="p-6 sm:p-8 md:p-10 relative z-10">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-1">
                {t.accountSettings}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                {t.manageProfile}
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white font-semibold rounded-full text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z"
                    clipRule="evenodd"
                  />
                </svg>
                {userData?.role === "admin"
                  ? t.admin
                  : userData?.role === "host"
                    ? t.host
                    : t.user}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Profile Card */}
        <div className="flex-1 min-w-[280px] max-w-[400px]">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center p-6 sm:p-8">
              <div className="relative inline-block">
                <div className="w-[120px] h-[120px] mx-auto rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-5xl flex items-center justify-center text-white">
                  {userData?.name?.charAt(0) || "U"}
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-4">{userData?.name}</h2>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                {userData?.email}
              </p>

              <hr className="my-4 border-gray-200" />

              <div className="text-left">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>{t.role}:</strong>{" "}
                  {userData?.role === "admin"
                    ? t.admin
                    : userData?.role === "host"
                      ? t.host
                      : t.user}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>{t.memberSince}:</strong>{" "}
                  {userData?.joinedDate || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Update Forms */}
        <div className="flex-[2] min-w-[320px]">
          <div className="flex flex-col gap-4">
            {/* Update Name Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold">
                      {t.profileInformation}
                    </h3>
                  </div>
                  {!editMode.name && (
                    <button
                      onClick={() =>
                        setEditMode((prev) => ({ ...prev, name: true }))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
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
                      {t.editName}
                    </button>
                  )}
                </div>

                {!editMode.name ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium">{userData?.name}</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        disabled={saving}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={t.fullName}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleCancelEdit("name")}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {t.cancel}
                      </button>
                      <button
                        onClick={handleUpdateName}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        {saving ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {t.saveChanges}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Update Password Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold">
                      {t.securitySettings}
                    </h3>
                  </div>
                  {!editMode.password && (
                    <button
                      onClick={() =>
                        setEditMode((prev) => ({ ...prev, password: true }))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
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
                      {t.changePassword}
                    </button>
                  )}
                </div>

                {!editMode.password ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-gray-500">••••••••••••••</span>
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                      {t.secure}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.currentPassword}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) =>
                            handleInputChange("currentPassword", e.target.value)
                          }
                          disabled={saving}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-12 ${
                            errors.currentPassword
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder={t.currentPassword}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          type="button"
                        >
                          {showPassword ? (
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
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.newPassword}
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) =>
                          handleInputChange("newPassword", e.target.value)
                        }
                        disabled={saving}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder={t.newPassword}
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.confirmPassword}
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        disabled={saving}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder={t.confirmPassword}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleCancelEdit("password")}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {t.cancel}
                      </button>
                      <button
                        onClick={handleUpdatePassword}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        {saving ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {t.updatePassword}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
