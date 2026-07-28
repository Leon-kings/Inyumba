/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material-UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "host";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "user" | "host";
  status: "active" | "inactive" | "suspended";
}

// Dummy data
const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    phone: "0788123456",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    phone: "0788123457",
    role: "user",
    status: "active",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
  {
    id: "3",
    name: "Host User",
    email: "host@example.com",
    phone: "0788123458",
    role: "host",
    status: "active",
    createdAt: "2024-01-17T12:00:00Z",
    updatedAt: "2024-01-17T12:00:00Z",
  },
  {
    id: "4",
    name: "Jane Student",
    email: "jane@student.com",
    phone: "0788123459",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-18T13:00:00Z",
    updatedAt: "2024-01-18T13:00:00Z",
  },
  {
    id: "5",
    name: "Peter Host",
    email: "peter@host.com",
    phone: "0788123460",
    role: "host",
    status: "suspended",
    createdAt: "2024-01-19T14:00:00Z",
    updatedAt: "2024-01-19T14:00:00Z",
  },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Form states
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    status: "active",
  });

  // Form validation states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    status?: string;
  }>({});

  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    admins: 0,
    hosts: 0,
    users: 0,
  });

  // Filter and search users
  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.phone.includes(term),
      );
    }

    // Role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  // Update statistics
  useEffect(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const inactive = users.filter((u) => u.status === "inactive").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    const admins = users.filter((u) => u.role === "admin").length;
    const hosts = users.filter((u) => u.role === "host").length;
    const userCount = users.filter((u) => u.role === "user").length;

    setStats({ total, active, inactive, suspended, admins, hosts, users: userCount });
  }, [users]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
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

  const getPasswordStrengthColor = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "#e5e7eb";
    switch (strength) {
      case "weak":
        return "#ef4444";
      case "moderate":
        return "#f59e0b";
      case "strong":
        return "#22c55e";
    }
  };

  const getPasswordStrengthLabel = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "";
    switch (strength) {
      case "weak":
        return "Weak";
      case "moderate":
        return "Moderate";
      case "strong":
        return "Strong";
    }
  };

  const getPasswordStrengthIcon = (
    strength: "weak" | "moderate" | "strong" | null,
  ) => {
    if (!strength) return null;
    switch (strength) {
      case "weak":
        return <WarningIcon className="w-4 h-4" style={{ color: "#ef4444" }} />;
      case "moderate":
        return (
          <SecurityIcon className="w-4 h-4" style={{ color: "#f59e0b" }} />
        );
      case "strong":
        return (
          <VerifiedIcon className="w-4 h-4" style={{ color: "#22c55e" }} />
        );
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
      role?: string;
      status?: string;
    } = {};

    if (!formData.name) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Please enter a valid Rwandan phone number (ex: 0788123456 or +250788123456)";
    }

    // Only validate password for create mode
    if (!selectedUser) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (passwordStrength === "weak") {
        newErrors.password = "Please choose a stronger password";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    if (selectedUser) {
      // Edit mode - only validate basic fields
      return (
        formData.name.length >= 2 &&
        formData.email.length > 0 &&
        validateEmail(formData.email) &&
        formData.phone.length > 0 &&
        validatePhone(formData.phone)
      );
    } else {
      // Create mode - validate all fields
      return (
        formData.name.length >= 2 &&
        formData.email.length > 0 &&
        validateEmail(formData.email) &&
        formData.phone.length > 0 &&
        validatePhone(formData.phone) &&
        formData.password.length >= 6 &&
        formData.confirmPassword.length >= 6 &&
        formData.password === formData.confirmPassword &&
        passwordStrength !== null &&
        passwordStrength !== "weak"
      );
    }
  };

  // Generate unique ID
  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  // CRUD Operations
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: generateId(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUsers([newUser, ...users]);
      toast.success("✅ User created successfully!");
      resetForm();
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error("❌ Failed to create user");
      console.error("Create user error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedUser) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...selectedUser,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        updatedAt: new Date().toISOString(),
      };

      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? updatedUser : user,
        ),
      );
      toast.success("✅ User updated successfully!");
      resetForm();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("❌ Failed to update user");
      console.error("Update user error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast.success("🗑️ User deleted successfully!");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("❌ Failed to delete user");
      console.error("Delete user error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.warning("Please select users to delete");
      return;
    }

    if (!window.confirm(`Delete ${selectedUsers.length} users?`)) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      toast.success(`🗑️ ${selectedUsers.length} users deleted successfully!`);
      setSelectedUsers([]);
    } catch (error) {
      toast.error("❌ Failed to delete users");
      console.error("Bulk delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
      status: "active",
    });
    setErrors({});
    setIsEmailValid(null);
    setIsPhoneValid(null);
    setPasswordStrength(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Open edit modal with user data
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      confirmPassword: "",
      role: user.role,
      status: user.status,
    });
    setIsEmailValid(validateEmail(user.email));
    setIsPhoneValid(validatePhone(user.phone));
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Handle form field changes
  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear errors for this field
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Email validation
    if (field === "email") {
      if (value.length > 0) {
        setIsEmailValid(validateEmail(value));
      } else {
        setIsEmailValid(null);
      }
    }

    // Phone validation
    if (field === "phone") {
      if (value.length > 0) {
        setIsPhoneValid(validatePhone(value));
      } else {
        setIsPhoneValid(null);
      }
    }

    // Password strength check
    if (field === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (
        formData.confirmPassword &&
        value === formData.confirmPassword
      ) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }

    // Confirm password check
    if (field === "confirmPassword") {
      if (formData.password && formData.password !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (formData.password && formData.password === value) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  // Toggle user selection for bulk actions
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  // Get role badge color
  const getRoleColor = (role: string): string => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "host":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PersonIcon className="w-7 h-7 text-[#FF385C]" />
              User Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage users, roles, and permissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedUsers.length > 0 && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <DeleteIcon className="w-4 h-4" />
                Delete ({selectedUsers.length})
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(true);
              }}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <AddIcon className="w-4 h-4" />
              Add User
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">Active</p>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">Inactive</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.inactive}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">Suspended</p>
          <p className="text-2xl font-bold text-red-700">{stats.suspended}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-200"
        >
          <p className="text-xs text-purple-600">Admins</p>
          <p className="text-2xl font-bold text-purple-700">{stats.admins}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">Hosts</p>
          <p className="text-2xl font-bold text-blue-700">{stats.hosts}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">Users</p>
          <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="host">Host</option>
              <option value="user">User</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterRole("all");
                setFilterStatus("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Joined
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    <PersonIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>No users found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-400">{user.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                          user.role,
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          user.status,
                        )}`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <EditIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <DeleteIcon className="w-4 h-4" />
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
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* Create User Modal - keep the same as before */}
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
              <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <PersonAddIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Add New User
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetForm();
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleCreateUser} className="p-6">
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Full Name *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Email *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isEmailValid === true
                          ? "border-green-500"
                          : isEmailValid === false
                          ? "border-red-500"
                          : errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <EmailIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isEmailValid === true
                            ? "text-green-500"
                            : isEmailValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="you@example.com"
                      />
                      {isEmailValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isEmailValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                    {isEmailValid === true && (
                      <p className="text-xs text-green-500 mt-1">
                        ✓ Valid email address
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Phone Number *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isPhoneValid === true
                          ? "border-green-500"
                          : isPhoneValid === false
                          ? "border-red-500"
                          : errors.phone
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
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="0788123456 or +250788123456"
                      />
                      {isPhoneValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isPhoneValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                    {isPhoneValid === true && (
                      <p className="text-xs text-green-500 mt-1">
                        ✓ Valid phone number
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Password *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="••••••••"
                        minLength={6}
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
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}

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
                          <div
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{
                              color: getPasswordStrengthColor(passwordStrength),
                            }}
                          >
                            {getPasswordStrengthIcon(passwordStrength)}
                            <span>
                              Strength: {getPasswordStrengthLabel(passwordStrength)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Confirm Password *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : formData.confirmPassword &&
                            formData.password === formData.confirmPassword &&
                            formData.confirmPassword.length > 0
                          ? "border-green-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <LockIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          formData.confirmPassword &&
                          formData.password === formData.confirmPassword &&
                          formData.confirmPassword.length > 0
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="••••••••"
                        minLength={6}
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
                      {formData.confirmPassword &&
                        formData.password === formData.confirmPassword &&
                        formData.confirmPassword.length > 0 && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {formData.confirmPassword &&
                      formData.password === formData.confirmPassword &&
                      formData.confirmPassword.length > 0 && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Passwords match
                        </p>
                      )}
                  </div>

                  {/* Role & Status Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        Role *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange(
                            "role",
                            e.target.value as UserFormData["role"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="user">User</option>
                        <option value="host">Host</option>
                        <option value="admin">Admin</option>
                      </select>
                      {errors.role && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange(
                            "status",
                            e.target.value as UserFormData["status"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      {errors.status && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
                      isSubmitting || !isFormValid()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF385C] hover:bg-[#E31C5F]"
                    } text-white`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Creating...
                        </>
                      ) : (
                        <>
                          <PersonAddIcon className="w-5 h-5" />
                          Create User
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit User Modal - keep the same as before */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
                setSelectedUser(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <EditIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Edit User
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditModalOpen(false);
                      resetForm();
                      setSelectedUser(null);
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleEditUser} className="p-6">
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Full Name *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Email *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isEmailValid === true
                          ? "border-green-500"
                          : isEmailValid === false
                          ? "border-red-500"
                          : errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <EmailIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isEmailValid === true
                            ? "text-green-500"
                            : isEmailValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="you@example.com"
                      />
                      {isEmailValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isEmailValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      Phone Number *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isPhoneValid === true
                          ? "border-green-500"
                          : isPhoneValid === false
                          ? "border-red-500"
                          : errors.phone
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
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="0788123456 or +250788123456"
                      />
                      {isPhoneValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isPhoneValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Role & Status Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        Role *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange(
                            "role",
                            e.target.value as UserFormData["role"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="user">User</option>
                        <option value="host">Host</option>
                        <option value="admin">Admin</option>
                      </select>
                      {errors.role && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange(
                            "status",
                            e.target.value as UserFormData["status"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      {errors.status && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>Password fields are optional for editing.</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className={`w-full mt-4 py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
                      isSubmitting || !isFormValid()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF385C] hover:bg-[#E31C5F]"
                    } text-white`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <EditIcon className="w-5 h-5" />
                          Update User
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal - keep the same as before */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
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
                      <DeleteIcon className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    Delete User
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                      {selectedUser?.name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedUser(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteUser}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        "Delete User"
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

